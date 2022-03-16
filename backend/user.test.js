const mongoose = require("mongoose");
const UserModel = require("./user");
const userData = { name: "John", email: "john@gmail.com", password: "password" };

describe("User Model Test", () => {

    beforeAll(async () => {
        await mongoose.connect("mongodb://localhost:27017/users", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .catch((error) => console.log(error));
    });

    it("create & save user successfully", async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
    });

    it("create user without required field should fail", async () => {
        const userWithoutRequiredField = new UserModel({ name: "Carlo" });
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.email).toBeDefined();
    });

})