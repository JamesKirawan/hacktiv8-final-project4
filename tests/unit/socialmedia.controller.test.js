const SocialMediaController = require("../../controllers/socialmedia.controller");
const httpMocks = require("node-mocks-http");
const { SocialMedia } = require("../../models");

jest.mock("../../models");

let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});
beforeEach(() => {
  jest.clearAllMocks();
});

const Data = {
  id: 1,
  name: "coba",
  social_media_url: "www.google.com",
  UserId: 1,
};

describe("SocialMediaController.getSocialMedia", () => {
  it("getAll socialmedia should return 200 ", async () => {
    SocialMedia.findAll.mockResolvedValue({ socialmedia: "facebook" });
    await SocialMediaController.getSocialMedia(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("getAll socialmedia should return 503 ", async () => {
    const rejected = Promise.reject({ message: "error" });
    SocialMedia.findAll.mockResolvedValue(rejected);
    await SocialMediaController.getSocialMedia(req, res);
    expect(res.statusCode).toBe(503);
  });
});

describe("Social Media postSocialMedia Testing", () => {
  it("post socialmedia should return 201 ", async () => {
    SocialMedia.create.mockResolvedValue({ socialmedia: "facebook" });
    await SocialMediaController.postSocialMedia(req, res);
    expect(res.statusCode).toBe(201);
  });

  it("post socialmedia should return 503 ", async () => {
    const rejected = Promise.reject({ message: "error" });
    SocialMedia.create.mockResolvedValue(rejected);
    await SocialMediaController.postSocialMedia(req, res);
    expect(res.statusCode).toBe(503);
  });
});

describe("SocialMediaController.putSocialMedia", () => {
  it("should return 401", async () => {
    const userInstance = {
      update: jest.fn(),
      save: jest.fn(),
    };
    SocialMedia.findByPk.mockResolvedValue({
      ...Data,
      ...userInstance,
    });
    SocialMedia.update.mockResolvedValue(Data);
    await SocialMediaController.putSocialMedia(req, res);
    expect(res.statusCode).toBe(401);
  });

  it("update socialmedia should return 200 ", async () => {
    req.userId = 1;
    const socialmediaInstance = {
      update: jest.fn(),
      save: jest.fn(),
    };
    SocialMedia.findByPk.mockResolvedValue({
      ...Data,
      ...socialmediaInstance,
    });
    SocialMedia.update.mockResolvedValue(Data);
    await SocialMediaController.putSocialMedia(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("update socialmedia should return 500 ", async () => {
    //const rejected = Promise.reject({ message: "error" });
    req.body = Data;
    req.userId = 1;
    // const userInstance = {
    //     update: jest.fn(),
    //     save: jest.fn()
    //   }
    SocialMedia.findByPk.mockResolvedValue({
      ...Data,
    });
    SocialMedia.update.mockRejectedValue({ message: "error" });
    await SocialMediaController.putSocialMedia(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe("SocialMedia deleteSocialMedia Testing", () => {
  it("should return 401", async () => {
    req.userId = 2;
    SocialMedia.findByPk.mockResolvedValue({
      ...Data,
    });
    SocialMedia.destroy.mockResolvedValue(true);
    await SocialMediaController.deleteSocialMedia(req, res);
    expect(res.statusCode).toBe(401);
  });

  it("delete socialmedia should return 200 ", async () => {
    req.userId = 1;
    SocialMedia.findByPk.mockResolvedValue({
      ...Data,
    });
    SocialMedia.destroy.mockResolvedValue(true);
    await SocialMediaController.deleteSocialMedia(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("delete socialmedia should return 500 ", async () => {
    req.userId = 1;
    SocialMedia.findByPk.mockResolvedValue({
      ...Data,
    });
    SocialMedia.destroy.mockRejectedValue({ message: "error" });
    await SocialMediaController.deleteSocialMedia(req, res);
    expect(res.statusCode).toBe(500);
  });
});
