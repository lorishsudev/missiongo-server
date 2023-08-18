const db = require("../models");
const baodao_h = db.baodao_h

// // Create and Save a new baodao_H
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a baodao_h
  // const baodao_H = new baodao_H({
  //   title: req.body.title,
  //   description: req.body.description,
  //   published: req.body.published ? req.body.published : false
  // });

  // Save baodao_H in the database
  baodao_h
    .create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the baodao_h."
      });
    });
};

// Retrieve all baodao_Hs from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  baodao_h.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving baodao_Hs."
      });
    });
};

// Find a single baodao_H with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  baodao_h.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found baodao_h with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving baodao_H with id=" + id });
    });
};

// Update a baodao_H by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  baodao_h.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update baodao_h with id=${id}. Maybe baodao_h was not found!`
        });
      } else res.send({ message: "baodao_h was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating baodao_H with id=" + id
      });
    });
};

// Delete a baodao_H with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  baodao_h.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete baodao_H with id=${id}. Maybe baodao_h was not found!`
        });
      } else {
        res.send({
          message: "baodao_h was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete baodao_h with id=" + id
      });
    });
};

// Delete all baodao_Hs from the database.
exports.deleteAll = (req, res) => {
  baodao_h.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} baodao_Hs were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all baodao_Hs."
      });
    });
};

// // Find all published baodao_Hs
// exports.findAllPublished = (req, res) => {
//   baodao_H.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving baodao_Hs."
//       });
//     });
// };