const PhotoController = require("../../controllers/photo.controller");
const httpMocks = require("node-mocks-http");
const { Photo } = require("../../models");

jest.mock("../../models/");

let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});
beforeEach(() => {
  jest.clearAllMocks();
});

const photoData = {
  id: 1,
  poster_image_url: "www.google.com",
  title: "Instagram Ni Bos",
  caption: "Instagram Aja",
  UserId: 1,
};

const photoDumpData = {
  id: 1,
  poster_image_url: "www.google.com",
  title: "Instagram Ni Bos",
  caption: "Instagram Aja",
  UserId: 2,
};

const acceptPhotoData = [
  {},
  {
    dataValues: {
      id: 1,
      poster_image_url: "www.google.com",
      title: "Instagram Ni Bos",
      caption: "Instagram Aja",
      UserId: 1,
      createdAt: "2022-01-01",
      updatedAt: "2022-02-02",
    },
  },
];

describe("PhotoController.getPhoto", () => {
  it("should return 200", async () => {
    Photo.findAll.mockResolvedValue({
      UserId: 1,
    });
    req.userId = 1;
    await PhotoController.getPhoto(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 503", async () => {
    const rejected = Promise.reject({ message: "Error" });
    Photo.findAll.mockResolvedValue(rejected);
    await PhotoController.getPhoto(req, res);
    expect(res.statusCode).toBe(503);
  });
});

describe("PhotoController.postPhoto", () => {
  it("should return 201", async () => {
    Photo.create.mockResolvedValue(photoData);
    req.body = photoData;
    await PhotoController.postPhoto(req, res);
    expect(res.statusCode).toBe(201);
  });
  it("should return 503", async () => {
    const rejected = Promise.reject({ message: "Error" });
    Photo.create.mockResolvedValue(rejected);
    await PhotoController.postPhoto(req, res);
    expect(res.statusCode).toBe(503);
  });
});

describe("PhotoController.putPhoto", () => {
  it("should return 401", async () => {
    req.userId = 1;
    Photo.findByPk.mockResolvedValue(photoDumpData);
    await PhotoController.putPhoto(req, res);
    expect(res.statusCode).toBe(401);
  });
  it("should return 200", async () => {
    req.userId = 1;
    Photo.findByPk.mockResolvedValue(photoData);
    Photo.update.mockResolvedValue(acceptPhotoData);
    await PhotoController.putPhoto(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 500", async () => {
    req.userId = 1;
    Photo.findByPk.mockResolvedValue(photoData);
    const rejected = Promise.reject({ message: "Error" });
    Photo.update.mockResolvedValue(rejected);
    await PhotoController.putPhoto(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe("PhotoController.deletePhoto", () => {
  it("should return 401", async () => {
    req.userId = 1;
    Photo.findByPk.mockResolvedValue(photoDumpData);
    await PhotoController.deletePhoto(req, res);
    expect(res.statusCode).toBe(401);
  });
  it("should return 200", async () => {
    req.userId = 1;
    Photo.findByPk.mockResolvedValue(photoData);
    Photo.destroy.mockResolvedValue({
      id: photoData.id,
    });
    await PhotoController.deletePhoto(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 500", async () => {
    req.userId = 1;
    Photo.findByPk.mockResolvedValue(photoData);
    const rejected = Promise.reject({ message: "Error" });
    Photo.destroy.mockResolvedValue(rejected);
    await PhotoController.deletePhoto(req, res);
    expect(res.statusCode).toBe(500);
  });
});
