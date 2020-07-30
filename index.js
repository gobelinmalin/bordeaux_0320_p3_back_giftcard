const express = require("express");
const app = express();
const api = require("./routes");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");

const fileUpload = require('express-fileupload');

app.use(express.static("public"));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", api);

app.listen(port, (err) => {
    if (err) {
        throw new Error("There is an error");
    }
});


// UPLOAD FILE
// to access the files in public folder
app.use(express.static('public'));
app.use(fileUpload());
// file upload api
app.post('/api/upload', (req, res) => {
  if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
  }
  // accessing the file
  const myFile = req.files.file;
  // mv() method places the file inside public directory
  myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }
      // return the response with file path and name
      return res.send({name: myFile.name, path: `/${myFile.name}`});
  });
})
