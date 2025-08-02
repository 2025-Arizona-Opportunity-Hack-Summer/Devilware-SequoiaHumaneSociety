const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = require("../s3");
const mongoClient = require("../database");
const { ObjectId } = require("mongodb");

require("dotenv").config();

async function findPets(req, res, next) {
  let { species, admin } = req.query;
  const filter = {};

  if (species !== undefined) {
    filter["species"] = species;
  }

  if (Boolean(admin) !== true) {
    filter["adopted_email"] = null;
    filter["on_hold_email"] = null;
  }

  try {
    const pipeline = [
      { $match: filter },
      {
        $facet: {
          data: [],
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
      pets: pets[0].data,
      breeds: pets[0].breeds[0].values,
    });
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "Problem occurs at server. Please contact for help",
      detail: err,
    });
  }
}

async function findPetById(req, res, next) {
  const { pet_id } = req.params;

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

    res.status(200).json(pet);
  } catch (err) {
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
      on_hold_email: null,
      on_hold_date: null,
      adopted_date: null,
      adopted_email: null,
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

    if (pet.on_hold_email === null) {
      await mongoClient
        .getDB()
        .collection("pets")
        .updateOne(
          { _id: ObjectId.createFromHexString(pet_id) },
          { $set: { on_hold_email: email, on_hold_date: new Date() } }
        );

      res.status(200).json({ ...pet, on_hold_email: email, on_hold_date: new Date() });
    } else {
      await mongoClient
        .getDB()
        .collection("pets")
        .updateOne(
          { _id: ObjectId.createFromHexString(pet_id) },
          { $set: { on_hold_email: null, on_hold_date: null } }
        );
      res.status(200).json({ ...pet, on_hold_email: null, on_hold_date: null });
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

    if (pet.adopted_email === null) {
      await mongoClient
        .getDB()
        .collection("pets")
        .updateOne(
          { _id: ObjectId.createFromHexString(pet_id) },
          { $set: { adopted_email: email, adopted_date: new Date(), on_hold_email: null, on_hold_date: null } }
        );

      await mongoClient
        .getDB()
        .collection("users")
        .updateOne(
          { email: email },
          {
            $push: {
              adoptedPets: {
                ...pet,
                adopted_email: email,
                adopted_date: new Date(),
                on_hold_email: null,
                on_hold_date: null,
              },
            },
          }
        );
      res
        .status(200)
        .json({ ...pet, adopted_email: email, adopted_date: new Date(), on_hold_email: null, on_hold_date: null });
    } else {
      await mongoClient
        .getDB()
        .collection("pets")
        .updateOne(
          { _id: ObjectId.createFromHexString(pet_id) },
          { $set: { adopted_email: null, adopted_date: null } }
        );

      await mongoClient
        .getDB()
        .collection("users")
        .updateOne(
          { email: email },
          {
            $pull: {
              adoptedPets: { _id: ObjectId.createFromHexString(pet_id) },
            },
          }
        );
      res.status(200).json({ ...pet, adopted_email: null, adopted_date: null });
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
  const { pet_id } = req.params;

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
async function findMatchedPets(req, res, next) {
  let answers = req.body;

  let model_result;
  try {
    const response = await fetch(process.env.AI_MODEL, {
      method: "POST",
      body: JSON.stringify(answers),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    model_result = data.predictions.map((item) => item[0]);
    const pets = await mongoClient
      .getDB()
      .collection("pets")
      .find({ animal_id: { $in: model_result } })
      .toArray();

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
    }

    res.status(200).json(pets);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "InternalServerError",
      message: "Problem occurs at server. Please contact for help",
      detail: err,
    });
  }

  // console.log(model_result);

  // try {
  //   const pipeline = [
  //     {
  //       $facet: {
  //         data: [],
  //         breeds: [
  //           { $unwind: "$breed" },
  //           { $group: { _id: "$breed" } },
  //           { $group: { _id: null, values: { $addToSet: "$_id" } } },
  //           { $project: { _id: 0, values: 1 } },
  //         ],
  //       },
  //     },
  //   ];

  //   const pets = await mongoClient.getDB().collection("pets").aggregate(pipeline).toArray();
  //   for (const pet of pets[0].data) {
  //     // const imagesUrl = [];
  //     const imagesUrlPromises = [];

  //     for (const image of pet.images) {
  //       const getObjectParam = {
  //         Bucket: process.env.BUCKET_NAME,
  //         Key: image,
  //       };
  //       const command = new GetObjectCommand(getObjectParam);
  //       const url = getSignedUrl(s3Client, command, { expiresIn: 3600 * 24 });
  //       imagesUrlPromises.push(url);
  //     }
  //     pet.imagesURL = await Promise.all(imagesUrlPromises);
  //   }

  //   res.status(200).json({
  //     pets: pets[0].data,
  //     breeds: pets[0].breeds[0].values,
  //   });
  // } catch (err) {
  //   res.status(500).json({
  //     error: "InternalServerError",
  //     message: "Problem occurs at server. Please contact for help",
  //     detail: err,
  //   });
  // }
}

module.exports = {
  findPets,
  createPet,
  updatePet,
  setPetOnHold,
  setPetAdopted,
  deletePet,
  findMatchedPets,
  findPetById,
};
