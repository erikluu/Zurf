// const cors = require("cors");
// const express = require("express");
// const app = express();
// app.use(cors());
// const port = 8000;
// app.use(express.json());

const express = require("express");
const userServices = require("./user-services");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Erik",
      email: "e",
      password: "haha",
      defaultLat: 35.2628,
      defaultLng: -120.6252,
      favorites: ["morro123", "pismo123"],
    },
    {
      id: "stupidman",
      name: "Carlo",
      email: "carlo@gmail.com",
      password: "dumb",
      defaultLat: 35.2628,
      defaultLng: -120.6252,
      favorites: ["morro123"],
    },
  ],
};

const locations = {
  locations_list: [
    {
      id: "morro123",
      name: "Morro Rock",
      lat: 35.373504,
      lng: -120.864096,
      image: "<<link>>",
      reviews: ["Good Rock", "Sweet waves man!"],
    },
    {
      id: "pismo123",
      name: "Pismo Beach",
      lat: 35.138778,
      lng: -120.643497,
      image: "<<image>>",
      reviews: ["Pismo more like abismo", "seagulllls be ruining my evening"],
    },
  ],
};


app.get("/", (req, res) => {
  res.send("pls dont hack zurf database");
});

// GET --------------------------------------------------------------------------
// get user by email

app.get("/users", async (req, res) => {
  const name = req.query.name;
  const job = req.query.email;
  try {
    const result = await userServices.getUsers(name, email);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured in the server");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const result = userServices.findUserById(id);
  if (result === undefined || result.length === null)
    res.status(404).send("Resource not found.");
  else {
    result = { users_list: result };
    res.send(result);
  }
});

// const findUserByEmail = (email) => {
//   return users["users_list"].filter((user) => user["email"] === email);
// };

// app.get("/users", (req, res) => {
//   res.send(users);
// });

// user authetication
app.get("/login", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  if (password === undefined || password.length == 0)
    res.send(404);
  if (email != undefined) {
    let result = authenticateUser(email, password);
    if (result != undefined) {
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(404);
    }
  } else {
    res.send(users);
  }
});

const authenticateUser = async (email, password) => {
  const user = await users.findUserByEmail(email);
  if (user[0]["password"] === password) return user;
};

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
  if (savedUser) res.status(201).send(savedUser).end();
  else res.status(500).end();
});

// app.post("/location", (req, res) => {
//   const locationToAdd = req.body;
//   addUser(locationToAdd);
//   res.status(200).end();
// });

// function addLocation(location) {
//   users["location_list"].push(location);
// }

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
