const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Erik",
      email: "eeluu19@gmail.com",
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

app.use(express.json());

// GET --------------------------------------------------------------------------
// get user by email
app.get("/user", (req, res) => {
  const email = req.query.email;
  if (email != undefined) {
    let result = findUserByEmail(email);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send("User not found");
  }
});

const findUserByEmail = (email) => {
  return users["users_list"].filter((user) => user["email"] === email);
};

app.get("/users", (req, res) => {
  res.send(users);
});

// user authetication
app.get("/login", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
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

const authenticateUser = (email, password) => {
  const user = users["users_list"].filter((user) => user["email"] === email);
  if (user[0]["password"] === password) return user;
};

app.get("/location", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findLocationByName(name);
    result = { locations_list: result };
    res.send(result);
  } else {
    res.send(locations);
  }
});

const findLocationByName = (name) => {
  return locations["locations_list"].filter((location) => location["name"] === name);
};

app.get("/locations", (req, res) => {
  res.send(locations);
});

// POST -------------------------------------------------------------------------------
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(200).end();
});

function addUser(user) {
  users["users_list"].push(user);
}

app.post("/location", (req, res) => {
  const locationToAdd = req.body;
  addUser(locationToAdd);
  res.status(200).end();
});

function addLocation(location) {
  users["location_list"].push(location);
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
