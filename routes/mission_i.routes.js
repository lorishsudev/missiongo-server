module.exports = app => {
    const mission_i = require("../controllers/mission_i.controller");
    const multer = require("multer");
    const upload = multer();
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", upload.single('image'), mission_i.create);
  
    // Retrieve all mission
    router.get("/", mission_i.findAll);
  
    // // Retrieve all published mission
    // //router.get("/published", mission.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", mission_i.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", mission_i.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", mission_i.delete);
  
    // // Create a new Tutorial
    // router.delete("/", mission_i.deleteAll);
  
    app.use("/api/mission_i", router);
  };