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
  UserModel.findOne({ userName: userName })
    .then(user => {
      if (!user) {
        bcrypt.hash(password, saltRounds)
          .then((hash) => {
            const password = hash;
            UserModel.create({ name, userName, password })
              .then(() => res.json('User successfully created!'))
              .catch(err => res.json(err))
          })
          .catch((err) => {
            console.log(err.message)
          });
      } else {
        res.json("Username already exists! Please choose another username.")
      }
    });
});

app.post("/login", (req, res) => {
  const { userName, password } = req.body;
  UserModel.findOne({ userName: userName })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          // console.log(response)
          if (err) {
            res.json(err);
          }
          if (response) {
            res.json("Success");
          } else {
            res.json("The password is incorrect");
          }
        })
      } else {
        res.json("Username does not exist!")
      }
    })
    .catch((err) => { console.log(err) })
});

app.get('/users/:userName/tasks', async (req, res) => {
  try {
    const { userName } = req.params;
    // Find the user by userName
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Return the tasks for the user
    if (!user.tasks) {
      user.tasks = {};
    }

    res.json({ tasks: user.tasks });
  } catch (error) {
    console.error('Error fetching user todos:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/users/:userName/tasks', async (req, res) => {
  try {
    const { userName } = req.params;
    const { id, text, completed } = req.body;

    // Find the user by userName
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Initialize user tasks if not present
    if (!user.tasks) {
      user.tasks = {};
    }

    // Add the new task to the user's tasks
    const newTask = { id, text, completed };
    user.tasks.set(id, newTask);
    await user.save();

    res.status(201).json({ message: 'Task created successfully', tasks: user.tasks });
  } catch (error) {
    console.error('Error creating user task:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/deletetask/:userName/:taskId', async (req, res) => {
  const { userName, taskId } = req.params;
    // Find the user by userName
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the task exists in the user's tasks
    if (!user.tasks.get(taskId)) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Delete the task from the user's tasks

    // console.log(user.tasks.get(taskId))
    user.tasks.delete(taskId);
    // console.log(user.tasks.get(taskId))

    await user.save();
    res.json({ message: 'Task deleted successfully' });
});

app.patch('/taskstatus/:userName/:taskId/', async (req, res) => {
  try {
    const { userName, taskId } = req.params;
    // Find the user by userName
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if the task exists in the user's tasks
    if (!user.tasks.get(taskId)) {
      return res.status(404).json({ error: 'Task not found' });
    }
    // Toggle the completion status of the task
    user.tasks.get(taskId).completed = !user.tasks.get(taskId).completed;
    await user.save();
    res.json({ message: 'Task completion status toggled successfully' });
  } catch (error) {
    console.error('Error toggling task completion:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});