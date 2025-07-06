const { MongoClient } = require("mongodb");

require("dotenv").config();

let mongoClient = undefined;
let dbName = "test";

module.exports = {
  init: async function (url) {
    mongoClient = new MongoClient(url);

    try {
      await mongoClient.connect();
    } catch (err) {
      throw err;
    }
  },
  getDB: function () {
    if (mongoClient === undefined) {
      throw err;
    }
    return mongoClient.db(dbName);
  },
};
