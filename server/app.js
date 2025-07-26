const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
// const { spawn } = require("child_process");
const multer = require("multer");
const mongoClient = require("./database");
const userRoute = require("./routes/userRoute");
const petRoute = require("./routes/petRoute");
const s3Client = require("./s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const PYTHON_SCRIPTS_DIR = path.join(__dirname, "..", "ai");
const SCRIPT_NAME = "python.py";

// app.get("/", (req, res) => {
//   const pythonScriptPath = path.join(PYTHON_SCRIPTS_DIR, SCRIPT_NAME);
//   const pythonProcess = spawn("python", [pythonScriptPath, "Nam"]);

//   let dataToSend = "";

//   pythonProcess.stdout.on("data", (data) => {
//     dataToSend = data;
//   });

//   pythonProcess.stderr.on("data", (data) => {
//     console.error(`Python stderr: ${data.toString()}`);
//     // If there's an error on stderr, we typically want to send an error response
//     // if (!res.headersSent) {
//     //   // Prevent "Cannot set headers after they are sent to the client"
//     //   res.status(500).send(`Error from Python script: ${data.toString()}`);
//     // }
//   });

//   pythonProcess.on("close", (code) => {
//     console.log(`Python process exited with code ${code}`);
//     if (code === 0) {
//       if (!res.headersSent) {
//         res.send(dataToSend);
//       }
//     }
//     // } else {
//     //     if (!res.headersSent) {
//     //         res.status(500).send('Python script execution failed with non-zero exit code.');
//     //     }
//     // }
//   });

//   pythonProcess.on("error", (err) => {
//     console.error("Failed to start Python subprocess.", err);
//     // if (!res.headersSent) {
//     //     res.status(500).send(`Failed to start Python process: ${err.message}`);
//     // }
//   });
// });

app.use("/users", userRoute);
app.use("/pets", petRoute);

app.post("/images", upload.array("images"), async (req, res) => {
  const images = req.files;

  try {
    const uploadPromises = images.map(async (file) => {
      const key = file.originalname;

      const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      try {
        await s3Client.send(command);
      } catch (err) {
        console.log(err);
        throw err;
      }
    });

    await Promise.all(uploadPromises);

    res.status(200).json({ message: "Upload images successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ messsage: "Cannot upload images" });
  }
});
mongoClient
  .init(process.env.MONGODB_ATLAS_CONNECTION)
  .then((response) => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server's listening");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// mongoose
//   .connect(process.env.DATABASE_CONNECTION)
//   .then((response) => {
//     app.listen(4041, () => {
//       console.log("Server's listening");
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
