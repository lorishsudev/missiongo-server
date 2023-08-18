const db = require("../models");
const cloudinary = require('cloudinary').v2;
const mission_i = db.mission_i

cloudinary.config({
  cloud_name: 'dzkoc5zt4',
  api_key: '646562914861447',
  api_secret: 'rX1zPAjQJ6GvWYCg2gVZ2OAomvs'
});

// // Create and Save a new mission_i
exports.create = async (req, res) => {

  const { buffer } = req.file;
  const { description } = req.body;
  // Validate request
  if (!req.body.description) {
    res.status(400).send({ message: "description can not be empty!" });
    return;
  }

  const uploadImageToCloudinary = () =>
    new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(buffer);
    });

  // Upload image to Cloudinary and handle the result
  uploadImageToCloudinary()
    .then(cloudinaryResult => {
      // Save mission_i in the database
      console.log(cloudinaryResult.secure_url)
      const missionData = {
        imageDataUrl: cloudinaryResult.secure_url, // Use the Cloudinary URL
        description: description
      };

      return mission_i.create(missionData);
    })
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.error('Error uploading image to Cloudinary:', error);
      res.status(500).send({
        message: 'An error occurred while creating the mission_i.'
      });
    });


  // Save mission_i in the database
  // mission_i
  //   .create({
  //     imageData: buffer,
  //     description: description
  //   })
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the mission_i."
  //     });
  //   });
};

// Retrieve all mission_is from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  mission_i.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mission_is."
      });
    });
};

// Find a single mission_i with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  mission_i.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found mission_i with id " + id });
      else {
        //res.send(data)
        const base64Image = Buffer.from(data.imageData).toString('base64');
        // console.log('Base64 image:', base64Image);
        res.send({
          "_id": data._id,
          "description": data.description,
          "imageData": base64Image
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving mission_i with id=" + id });
    });
};