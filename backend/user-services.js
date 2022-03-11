const mongoose = require("mongoose");
const userModel = require("./user");

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getUsers(name, email) {
  let result;
  if (name === undefined && email === undefined) {
    result = await userModel.find();
  } else if (name && !email) {
    result = await findUserByName(name);
  } else if (email && !name) {
    result = await findUserByEmail(email);
  } else if (email && name) {
    result = await userModel.find({ name: name, email: email });
  }
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteUserById(id) {
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByEmail(email) {
  return await userModel.find({ email: email });
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.deleteUserById = deleteUserById;
exports.findUserByEmail = findUserByEmail;