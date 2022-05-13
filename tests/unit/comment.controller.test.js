const CommentController = require("../../controllers/comment.controller");
const httpMocks = require("node-mocks-http");
const { Comment } = require("../../models");

jest.mock("../../models");

let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});
beforeEach(() => {
  jest.clearAllMocks();
});

const reflectionData = {
  comment: "Coba",
};

describe("CommentController.getComment", () => {
  it("get All comment should return 200 ", async () => {
    Comment.findAll.mockResolvedValue({ comment: "comment" });
    await CommentController.getComment(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("should return 503", async () => {
    const rejected = Promise.reject({ message: "error" });
    Comment.findAll.mockResolvedValue(rejected);
    await CommentController.getComment(req, res);
    expect(res.statusCode).toBe(503);
  });
});

describe("CommentController.putComment", () => {
  it("should return 401", async () => {
    req.userId = 1;
    Comment.findByPk.mockResolvedValue(reflectionData);
    await CommentController.putComment(req, res);
    expect(res.statusCode).toBe(401);
  });

  it("update Comment should return 200 ", async () => {
    Comment.update.mockResolvedValue({ Comment: "Comment" });
    await CommentController.putComment(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("update Comment should return 500 ", async () => {
    const rejected = Promise.reject({ message: "error" });
    Comment.update.mockResolvedValue(rejected);
    await CommentController.putComment(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe("Comment deleteComment Testing", () => {
  it("should return 401", async () => {
    req.userId = 1;
    Comment.findByPk.mockResolvedValue(reflectionData);
    await CommentController.deleteComment(req, res);
    expect(res.statusCode).toBe(401);
  });
  it("delete Comment should return 200 ", async () => {
    Comment.destroy.mockResolvedValue({ comment: "comment" });
    await CommentController.deleteComment(req, res);
    expect(res.statusCode).toBe(200);
  });

  it("delete Comment should return 500 ", async () => {
    const rejected = Promise.reject({ message: "error" });
    Comment.destroy.mockResolvedValue(rejected);
    await CommentController.deleteComment(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe("Comment postComment Testing", () => {
  it("post commentsshould return 401 ", async () => {
    Comment.findOne.mockResolvedValue(null);
    await CommentController.postComment(req, res);
    expect(res.statusCode).toBe(401);
  });
  it("post comments should return 201 ", async () => {
    const data = {
      comment: "comment",
      PhotoId: 1,
    };
    Comment.findOne.mockResolvedValue(data);
    Comment.create.mockResolvedValue({ Comment: "Comment" });
    await CommentController.postComment(req, res);
    expect(res.statusCode).toBe(201);
  });

  it("post comments should return 503 ", async () => {
    const data = {
      comment: "comment",
      PhotoId: 1,
    };
    const rejected = Promise.reject({ message: "error" });
    Comment.findOne.mockResolvedValue(data);
    Comment.create.mockResolvedValue(rejected);
    await CommentController.postComment(req, res);
    expect(res.statusCode).toBe(503);
  });
});
