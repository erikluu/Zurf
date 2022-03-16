const mongoose = require("mongoose");
const UserModel = require("./user");
const userServicesFuncs = require("./user-services");
const testData = { name: "John", email: "john@gmail.com", password: "password" };

describe("User Model Test", () => {

    beforeAll(async () => {
        await mongoose.connect("mongodb+srv://erik_test0:12345@cluster0.pdi2t.mongodb.net/users?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }, err => {
            if (err) {
              console.error(err);
              process.exit(1);
          }
        })
    });

    it("test get all users", async () => {
        let users = await userServicesFuncs.getUsers();
        expect(users).toBeDefined();
        expect(users.length).toBeGreaterThan(0);
    });

    it("test get users with email", async () => {
      let users = await userServicesFuncs.getUsers(undefined, "carlo@carlo.com");
      expect(users).toBeDefined();
      expect(users.length).toBe(1);
    });

    it("test get users with name", async () => {
      let users = await userServicesFuncs.getUsers("Carlo");
      expect(users).toBeDefined();
      expect(users.length).toBe(1);
    });

    it("test get users with name and email", async () => {
      let users = await userServicesFuncs.getUsers("Carlo", "carlo@carlo.com");
      expect(users).toBeDefined();
      expect(users.length).toBe(1);
    });

    it("test add user", async () => {
      let user = await userServicesFuncs.addUser(testData);
      let users = await userServicesFuncs.getUsers(testData.name, testData.email);
      users = users[0];
      expect(user).toBeDefined();
      expect(users.name).toBe(testData.name);
      expect(users.email).toBe(testData.email);
      expect(users.password).toBe(testData.password);
    });

    it("add user error", async () => {
      const userWithoutRequiredField = { name: "Carlo" };
      const savedUserWithoutRequiredField = await userServicesFuncs.addUser(userWithoutRequiredField);
      expect(savedUserWithoutRequiredField).toBeFalsy();
    });

    it("test auth user", async () => {
      let user = await userServicesFuncs.authUser("balls", "12345");
      expect(user).toBeDefined();
      user = user[0];
      expect(user.name).toBe("carlo");
      expect(user.email).toBe("balls");
      expect(user.password).toBe("12345");
    });

    it("test auth user w/o email/password", async () => {
      let user = await userServicesFuncs.authUser();
      expect(user).toBeUndefined();
    });

    afterAll(async () => {
      let err;
      try {
        await mongoose.connect("no", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        err = 5;
      } catch (error) {
          err = error
      }
      expect(err).toBeInstanceOf(mongoose.Error)
  });

})