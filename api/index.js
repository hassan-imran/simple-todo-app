const express = require("express");
const cors = require("cors");
require('dotenv').config();

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});