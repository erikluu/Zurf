const mongoose = require("mongoose");
const UserModel = require("./user");
const userData = { name: "John", email: "john@gmail.com", password: "password" };

describe("User Model Test", () => {

    beforeAll(async () => {
        await mongoose.connect("mongodb+srv://erik_test0:12345@cluster0.pdi2t.mongodb.net/users?retryWrites=true&w=majority", {
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

    it("create user with invalid email should fail", async () => {
        const userWithoutRequiredField = new UserModel({ name: "Carlo", email: "a", password: "12345698765" });
        let err;
        try {
            const savedUserWithInvalidField = await userWithoutRequiredField.save();
            error = savedUserWithInvalidField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    });

    it("create user with invalid email should fail", async () => {
        const userWithoutRequiredField = new UserModel({ name: "Carlo", email: "asdfgh", password: "123" });
        let err;
        try {
            const savedUserWithInvalidField = await userWithoutRequiredField.save();
            error = savedUserWithInvalidField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    });

})