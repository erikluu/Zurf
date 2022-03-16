const express = require("express");
const userServices = require("./user-services");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).send("pls dont hack zurf database");
});

// GET --------------------------------------------------------------------------
// get user by email

app.get("/users", async (req, res) => {
  const name = req.query.name;
  const email = req.query.email;
  const result = await userServices.getUsers(name, email);
  res.status(200).send({ users_list: result });
});

// app.get("/users/id", async (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   let result = userServices.findUserById(id);
//   if (result === undefined || result.length === null)
//     res.status(404).send("Resource not found.");
//   else {
//     result = { users_list: result };
//     res.send(result);
//   }
// });

// user authetication
app.get("/login", async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  let result = await userServices.authUser(email, password);
  result = { users_list: result };
  //console.log(result)
  res.status(200).send(result);
});

// app.get("/location", (req, res) => {
//   const name = req.query.name;
//   if (name != undefined) {
//     let result = findLocationByName(name);
//     result = { locations_list: result };
//     res.send(result);
//   } else {
//     res.send(locations);
//   }
// });
// const findLocationByName = (name) => {
//   return locations["locations_list"].filter((location) => location["name"] === name);
// };

// app.get("/locations", (req, res) => {
//   res.send(locations);
// });

// POST -------------------------------------------------------------------------------

app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  const savedUser = await userServices.addUser(userToAdd);
  if (savedUser) 
    res.status(201).send(savedUser).end();
  else
    res.status(500).end();
});

// app.post("/location", (req, res) => {
//   const locationToAdd = req.body;
//   addUser(locationToAdd);
//   res.status(200).end();
// });

// function addLocation(location) {
//   users["location_list"].push(location);
// }

module.exports = app;