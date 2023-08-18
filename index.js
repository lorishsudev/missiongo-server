const express = require("express");
const app = express();

//Middeleware
//1. parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */
//2. parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to NodeJS APi." });
});

//routes
require("./routes/mission_i.routes")(app);


//***Listen Start***
//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
//***Listen End***