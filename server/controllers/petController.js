const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = require("../s3");
const mongoClient = require("../database");
const { ObjectId } = require("mongodb");

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
    res.status(500).json({
      error: "InternalServerError",
      message: "Problem occurs at server. Please contact for help",
      detail: err,
    });
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
    res.status(500).json({
      error: "InternalServerError",
      message: "Problem occurs at server. Please contact for help",
      detail: err,
    });
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
      res.status(400).json({
        error: "PetNotFound",
        message: "Cannot find pet",
      });
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
      return;
    }

    if (pet.onHoldEmail === undefined || pet.onHoldEmail === null) {
      await mongoClient
        .getDB()
        .collection("pets")
        .updateOne(
          { _id: ObjectId.createFromHexString(pet_id) },
          { $set: { onHoldEmail: email, onHoldDate: new Date() } }
        );

      res.status(200).json({ ...pet, onHoldEmail: email, onHoldDate: new Date() });
    } else {
      await mongoClient
        .getDB()
        .collection("pets")
        .updateOne({ _id: ObjectId.createFromHexString(pet_id) }, { $set: { onHoldEmail: null, onHoldDate: null } });
      res.status(200).json({ ...pet, onHoldEmail: null, onHoldDate: null });
    }
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "Problem occurs at server. Please contact for help",
      detail: err,
    });
  }
}

async function setPetAdopted(req, res, next) {
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
      return;
    }

    if (pet.adoptedEmail === undefined || pet.adoptedEmail === null) {
      await mongoClient
        .getDB()
        .collection("pets")
        .updateOne(
          { _id: ObjectId.createFromHexString(pet_id) },
          { $set: { adoptedEmail: email, adoptedDate: new Date(), onHoldEmail: null, onHoldDate: null } }
        );

      res
        .status(200)
        .json({ ...pet, adoptedEmail: email, adoptedDate: new Date(), onHoldEmail: null, onHoldDate: null });
    } else {
      await mongoClient
        .getDB()
        .collection("pets")
        .updateOne({ _id: ObjectId.createFromHexString(pet_id) }, { $set: { adoptedEmail: null, adoptedDate: null } });
      res.status(200).json({ ...pet, adoptedEmail: null, adoptedDate: null });
    }
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "Problem occurs at server. Please contact for help",
      detail: err,
    });
  }
}

async function deletePet(req, res, next) {
  const { pet_id } = req.query;

  try {
    const pet = await mongoClient
      .getDB()
      .collection("pets")
      .findOne({ _id: ObjectId.createFromHexString(pet_id) });

    if (pet == null) {
      res.status(400).json({
        error: "PetNotFound",
        message: "Cannot find pet",
      });
      return;
    }

    if (pet.images.length !== 0) {
      const deletePromises = pet.images.map(async (image) => {
        const command = new DeleteObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: image,
        });

        try {
          await s3Client.send(command);
        } catch (err) {
          console.log(err);
          throw err;
        }
      });

      await Promise.all(deletePromises);
    }

    await mongoClient
      .getDB()
      .collection("pets")
      .deleteOne({ _id: ObjectId.createFromHexString(pet_id) });

    res.status(204).json();
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
  setPetAdopted,
  deletePet,
};
