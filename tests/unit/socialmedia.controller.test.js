const SocialMediaController = require("../../controllers/socialmedia.controller");
const httpMocks = require("node-mocks-http");
const {SocialMedia}= require("../../models");

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
    name : "coba",
    social_media_url : "www.google.com",
    UserId: 1,
  };

describe("SocialMediaController.getSocialMedia", () => {
    it("getAll socialmedia should return 201 ", async() => {
        SocialMedia.findAll.mockResolvedValue({ socialmedia : "facebook" });
        await SocialMediaController.getSocialMedia(req, res);
        expect(res.statusCode).toBe(201);
    });

    it("getAll socialmedia should return 503 ", async() => {
        const rejected = Promise.reject({ message: "error" });
        SocialMedia.findAll.mockResolvedValue(rejected);
        await SocialMediaController.getSocialMedia(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Social Media postSocialMedia Testing", () => {
    it("post socialmedia should return 201 ", async() => {
        SocialMedia.create.mockResolvedValue({ socialmedia : "facebook" });
        await SocialMediaController.postSocialMedia(req, res);
        expect(res.statusCode).toBe(201);
    });

    it("post socialmedia should return 503 ", async() => {
        const rejected = Promise.reject({ message: "error" });
        SocialMedia.create.mockResolvedValue(rejected);
        await SocialMediaController.postSocialMedia(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("SocialMediaController.putSocialMedia", () => {
    it("should return 401", async () => {
        req.userId = 1;
        req.body = Data;
        SocialMedia.findByPk.mockResolvedValue(Data);
        await SocialMediaController.putSocialMedia(req, res);
        expect(res.statusCode).toBe(401);
      });

    it("update socialmedia should return 200 ", async() => {
        req.body = Data;
        SocialMedia.update.mockResolvedValue(Data);
        await SocialMediaController.putSocialMedia(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("update socialmedia should return 500 ", async() => {
        const rejected = Promise.reject({ message: "error" });
        SocialMedia.update.mockResolvedValue(rejected);
        req.body = Data;
        await SocialMediaController.putSocialMedia(req, res);
        expect(res.statusCode).toBe(500);
    });
});

describe("SocialMedia deleteSocialMedia Testing", () => {
    it("should return 401", async () => {
        req.userId = 1;
        SocialMedia.findByPk.mockResolvedValue(Data);
        await SocialMediaController.deleteSocialMedia(req, res);
        expect(res.statusCode).toBe(401);
      });

    it("delete socialmedia should return 200 ", async() => {
        SocialMedia.destroy.mockResolvedValue({ socialmedia : "facebook"});
        await SocialMediaController.deleteSocialMedia(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("delete socialmedia should return 500 ", async() => {
        const rejected = Promise.reject({ message: "error" });
        SocialMedia.destroy.mockResolvedValue(rejected);
        await SocialMediaController.deleteSocialMedia(req, res);
        expect(res.statusCode).toBe(500);
    });
});