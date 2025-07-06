const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = require("../s3");
const mongoClient = require("../database");

const Pet = require("../models/pet");

require("dotenv").config();

async function findPets(req, res, next) {
  try {
    const pets = await mongoClient.getDB().collection("pets").find({}).toArray();

    for (const pet of pets) {
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
      // await pet.save({ timestamps: false });
    }

    res.status(200).json({ description: "Find pet successfully", content: pets });
  } catch (err) {
    console.log(err);
    res.status(400).json({ description: "Cannot find pet" });
  }
}

module.exports = {
  findPets,
};
