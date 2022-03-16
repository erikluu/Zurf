const mongoose = require("mongoose");
const userModel = require("./user");

mongoose
  .connect("mongodb+srv://erik_test0:12345@cluster0.pdi2t.mongodb.net/users?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  //need to test 
  //.catch((error) => console.log(error));

async function getUsers(name, email) {
  let result;
  if (name === undefined && email === undefined) {
    result = await userModel.find();
  } else if (name && !email) {
    result = await findUserByName(name);
  } else if (email && !name) {
    result = await findUserByEmail(email);
  } else {
    result = await userModel.find({ name: name, email: email });
  }
  return result;
}

// async function findUserById(id) {
//   try {
//     return await userModel.findById(id);
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }

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

//we have not implemented a delete user functionality

// async function deleteUserById(id) {
//   try {
//     const deletedUser = await userModel.findByIdAndDelete(id);
//     return deletedUser;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByEmail(email) {
  return await userModel.find({ email: email });
}

async function authUser(email, password) {
  if (email === undefined || password === undefined) {
    return undefined;
  } else {
    console.log("defined email + password")
    const result = await userModel.find({ email: email, password: password });
    console.log(result);
    return result;
  }
}

exports.getUsers = getUsers;
//exports.findUserById = findUserById;
exports.addUser = addUser;
//exports.deleteUserById = deleteUserById;
exports.findUserByName = findUserByName;
exports.findUserByEmail = findUserByEmail;
exports.authUser = authUser;
