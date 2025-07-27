const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

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

async function createPet(req, res, next) {
  const { active_level, adoption_fee, age, animal_id, breed, characteristics, name, sex, species, weight, images } =
    req.body;

  try {
    const newPet = {
      name: name,
      animal_id: animal_id,
      species: species,
      breed: breed,
      active_level: active_level,
      adoption_fee: adoption_fee,
      characteristics: characteristics,
      age: age,
      sex: sex,
      weight: weight,
      images: images,
    };
    await mongoClient.getDB().collection("pets").insertOne(newPet);

    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: "Cannot create pet" });
  }
}

async function updatePet(req, res, next) {
  const { pet_id } = req.params;
  const { active_level, adoption_fee, age, animal_id, breed, characteristics, name, sex, species, weight, images } =
    req.body;

  try {
    const pet = await mongoClient
      .getDB()
      .collection("pets")
      .findOne({ _id: ObjectId.createFromHexString(pet_id) });

    if (pet === null) {
      res.status(400).json({ messsage: "Cannot find pet" });
      return;
    }

    const updatedPet = {
      name: name,
      animal_id: animal_id,
      species: species,
      breed: breed,
      active_level: active_level,
      adoption_fee: adoption_fee,
      characteristics: characteristics,
      age: age,
      sex: sex,
      weight: weight,
      images: images,
    };

    await mongoClient
      .getDB()
      .collection("pets")
      .updateOne({ _id: ObjectId.createFromHexString(pet_id) }, { $set: updatedPet });

    res.status(200).json(updatedPet);
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "Problem occurs at server. Please contact for help",
      detail: err,
    });
  }
}

async function setPetOnHold(req, res, next) {
  const { pet_id, email } = req.params;

  try {
    const user = await mongoClient.getDB().collection("users").findOne({ email: email });

    if (user == null) {
      res.status(400).json({
        error: "UserNotFound",
        message: "Cannot find user",
      });
      return;
    }

    const pet = await mongoClient
      .getDB()
      .collection("pets")
      .findOne({ _id: ObjectId.createFromHexString(pet_id) });

    if (pet == null) {
      res.status(400).json({
        error: "PetNotFound",
        message: "Cannot find pet",
      });
    }

    await mongoClient
      .getDB()
      .collection("pets")
      .updateOne(
        { _id: ObjectId.createFromHexString(pet_id) },
        { $set: { onHoldEmail: email, onHoldDate: new Date() } }
      );

    res.status(200).json({ ...pet, onHoldEmail: email, onHoldDate: new Date() });
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "Problem occurs at server. Please contact for help",
      detail: err,
    });
  }
}
module.exports = {
  findPets,
  createPet,
  updatePet,
  setPetOnHold,
};
