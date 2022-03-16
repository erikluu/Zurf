const request = require("supertest");
const app = require("./backend");
const testData = { name: "John", email: "john@gmail.com", password: "password" };

describe("test root path", () => {
  test("get /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("test get users", () => {
  test("get /users", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
  });
});

describe("test login", () => {
  test("get /login", async () => {
    const response = await request(app).get("/login");
    expect(response.statusCode).toBe(200);
  });
});

describe("test post fail", () => {
  test("get /post", async () => {
    const response = await request(app).post("/users");
    expect(response.statusCode).toBe(500);
  });
});

describe("test post", () => {
  test("get /post", async () => {
    const response = await request(app).post("/users").send(testData);
    expect(response.statusCode).toBe(201);
  });
});





  
  