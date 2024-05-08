const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    text: String,
    completed: { type: Boolean, default: false }
});

const UserSchema = new mongoose.Schema({
    name: String,
    userName: { type: String, unique: true, index: true },
    password: String,
    tasks: { type: Map, of: TaskSchema }
})

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;