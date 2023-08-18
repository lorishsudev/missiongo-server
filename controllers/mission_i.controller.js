const db = require("../models");
const mission_i = db.mission_i

// // Create and Save a new mission_i
exports.create = (req, res) => {

  const { buffer } = req.file;
  const { description } = req.body;
  // Validate request
  if (!req.body.description) {
    res.status(400).send({ message: "description can not be empty!" });
    return;
  }


  // Save mission_i in the database
  mission_i
    .create({
      imageData: buffer,
      description: description
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the mission_i."
      });
    });
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