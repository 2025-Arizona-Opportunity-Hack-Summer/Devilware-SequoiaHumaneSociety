const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = require("../s3");
const mongoClient = require("../database");
const { ObjectId } = require("mongodb");

const Pet = require("../models/pet");

require("dotenv").config();

async function findPets(req, res, next) {
  let { pet_id, page, pageSize, species } = req.query;
  const filter = {};

  if (pet_id !== undefined) {
    if (Array.isArray(pet_id)) {
      filter["_id"] = { $in: pet_id.map((id) => ObjectId.createFromHexString(id)) };
    } else {
      filter["_id"] = ObjectId.createFromHexString(pet_id);
    }
  } else if (species !== undefined) {
    filter["species"] = species;
  }

  page = parseInt(page, 10) || 1; // pagination
  pageSize = parseInt(pageSize, 10) || 100;
  try {
    const pipeline = [
      { $match: filter },
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
          breeds: [
            { $unwind: "$breed" },
            { $group: { _id: "$breed" } },
            { $group: { _id: null, values: { $addToSet: "$_id" } } },
            { $project: { _id: 0, values: 1 } },
          ],
        },
      },
    ];

    const pets = await mongoClient.getDB().collection("pets").aggregate(pipeline).toArray();

    for (const pet of pets[0].data) {
      // const imagesUrl = [];
      const imagesUrlPromises = [];

      for (const image of pet.images) {
        const getObjectParam = {
          Bucket: process.env.BUCKET_NAME,
          Key: image,
        };
        const command = new GetObjectCommand(getObjectParam);
        const url = getSignedUrl(s3Client, command, { expiresIn: 3600 * 24 });
        imagesUrlPromises.push(url);
      }
      pet.imagesURL = await Promise.all(imagesUrlPromises);
    }

    res.status(200).json({
      description: "Find pet successfully",
      content: pets[0].data,
      metadata: pets[0].metadata,
      breeds: pets[0].breeds[0].values,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ description: "Cannot find pet" });
  }
}

module.exports = {
  findPets,
};
