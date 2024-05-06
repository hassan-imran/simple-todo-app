const express = require("express");
const cors = require("cors");
require('dotenv').config();
const UserModel = require('./models/User');

const app = express();
const port = process.env.PORT || 8001;
const mongoUri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

const { mongoose } = require('mongoose');
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post("/signup", (req, res) => {
  const { name, userName, password } = { ...req.body }

  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      const password = hash;
      console.log(hash)
      UserModel.create({ name, userName, password })
        .then((users) => res.json(users))
        .catch(err => res.json(err))
    })
    .catch((err) => {
      console.log(err.message)
    });


});

app.post("/login", (req, res) => {
  const { userName, password } = req.body;
  UserModel.findOne({ userName: userName })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (err) {
            res.json("The password was incorrect!");
          } else if (response) {
            res.json("Success");
          }
        })
      } else {
        res.json("Username does not exist!")
      }
    })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});