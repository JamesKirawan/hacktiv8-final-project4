const UserController = require("../../controllers/user.controller");
const httpMocks = require("node-mocks-http");
const { User } = require("../../models");
const { hashPassword } = require("../../helpers/bcrypt");

jest.mock("../../models/");

let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});
beforeEach(() => {
  jest.clearAllMocks();
});

const userData = {
  id: 1,
  email: "asd@gmail.com",
  password: "secret",
};

const nameData = {
  id: 1,
  full_name: "Testing",
  email: "asd@gmail.com",
  password: "secret",
};

const testingData = {
  id: 1,
  email: "asd@gmail.com",
  password: hashPassword("secret"),
};

const testingData2 = {
  id: 1,
  email: "asd@gmail.com",
  password: hashPassword("supersecret"),
};

const testingData3 = [
  {},
  {
    dataValues: {
      email: "asd@gmail.com",
      full_name: "jemsk",
      username: "jemsk",
      profile_image_url: "www.google.com",
      age: "17",
      phone_number: "089635472193",
    },
  },
];
describe("UserController.registerUser", () => {
  it("should return 201", async () => {
    User.create.mockResolvedValue(userData);
    User.findOne.mockResolvedValue(null);
    req.body = userData;
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(201);
  });
  it("should return 400", async () => {
    User.findOne.mockResolvedValue({
      email: "asssd@gmail.com",
    });
    req.body = userData;
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(400);
  });
  it("should return 503", async () => {
    const rejected = Promise.reject({ message: "Error" });
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(rejected);
    req.body = userData;
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(503);
  });
  it("should return 500", async () => {
    const rejected = Promise.reject({ message: "Error" });
    User.findOne.mockResolvedValue(rejected);
    req.body = userData;
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(500);
  });
  it("should Equal to Data Given", async () => {
    User.create.mockResolvedValue(nameData);
    User.findOne.mockResolvedValue(null);
    req.body = nameData;
    await UserController.registerUser(req, res);
    expect(res._getJSONData()).toEqual({
      user: {
        email: nameData.email,
        full_name: nameData.full_name,
      },
    });
  });
});

describe("UserController.loginUser", () => {
  it("should return 200", async () => {
    User.findOne.mockResolvedValue(testingData);
    req.body = userData;
    await UserController.loginUser(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 400", async () => {
    User.findOne.mockResolvedValue(null);
    await UserController.loginUser(req, res);
    expect(res.statusCode).toBe(400);
  });
  it("should return 400", async () => {
    User.findOne.mockResolvedValue(testingData);
    req.body = testingData2;
    await UserController.loginUser(req, res);
    expect(res.statusCode).toBe(400);
  });
  it("should return 401", async () => {
    const rejected = Promise.reject({ message: "Error" });
    User.findOne.mockResolvedValue(rejected);
    req.body = userData;
    await UserController.loginUser(req, res);
    expect(res.statusCode).toBe(401);
  });
  it("should return success token", async () => {
    User.findOne.mockResolvedValue(testingData);
    req.body = userData;
    await UserController.loginUser(req, res);
    expect(res._getJSONData()).toEqual({
      token: res._getJSONData().token,
    });
  });
});

describe("UserController.putUser", () => {
  it("should return 400", async () => {
    req.userId = 1;
    req.params.userId = 2;
    await UserController.putUser(req, res);
    expect(res.statusCode).toBe(400);
  });
  it("should return 200", async () => {
    req.userId = 1;
    req.params.userId = 1;
    User.update.mockResolvedValue(testingData3);
    req.body = testingData3;
    await UserController.putUser(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 500", async () => {
    req.userId = 1;
    req.params.userId = 1;
    const rejected = Promise.reject({ message: "Error" });
    User.update.mockResolvedValue(rejected);
    req.body = userData;
    await UserController.putUser(req, res);
    expect(res.statusCode).toBe(500);
  });
  it("should Equal to Data Given", async () => {
    req.userId = 1;
    req.params.userId = 1;
    User.update.mockResolvedValue(testingData3);
    req.body = testingData3;
    await UserController.putUser(req, res);
    expect(res._getJSONData()).toEqual({ user: testingData3[1].dataValues });
  });
  it("Status Message Should OK", async () => {
    req.userId = 1;
    req.params.userId = 1;
    User.update.mockResolvedValue(testingData3);
    req.body = testingData3;
    await UserController.putUser(req, res);
    expect(res.statusMessage).toBe("OK");
  });
});

describe("UserController.deleteUser", () => {
  it("should return 400", async () => {
    req.userId = 1;
    req.params.userId = 2;
    await UserController.deleteUser(req, res);
    expect(res.statusCode).toBe(400);
  });
  it("should return 200", async () => {
    req.userId = 1;
    req.params.userId = 1;
    User.destroy.mockResolvedValue(testingData3);
    req.body = testingData3;
    await UserController.deleteUser(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 500", async () => {
    req.userId = 1;
    req.params.userId = 1;
    const rejected = Promise.reject({ message: "Error" });
    User.destroy.mockResolvedValue(rejected);
    req.body = userData;
    await UserController.deleteUser(req, res);
    expect(res.statusCode).toBe(500);
  });
  it("should equal to given message", async () => {
    req.userId = 1;
    req.params.userId = 1;
    User.destroy.mockResolvedValue(testingData3);
    req.body = testingData3;
    await UserController.deleteUser(req, res);
    expect(res._getJSONData()).toEqual({
      message: "Your Account Has Been successfully deleted",
    });
  });
  it("Status Message Should OK", async () => {
    req.userId = 1;
    req.params.userId = 1;
    User.destroy.mockResolvedValue(testingData3);
    req.body = testingData3;
    await UserController.deleteUser(req, res);
    expect(res.statusMessage).toEqual("OK");
  });
});
