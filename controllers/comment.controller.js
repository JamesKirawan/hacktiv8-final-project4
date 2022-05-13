const { Photo, User, Comment } = require("../models");

exports.getComment = async (req, res) => {
  await Comment.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "username", "profile_image_url", "phone_number"],
      },
      {
        model: Photo,
        as: "photo",
        attributes: ["id", "title", "caption", "poster_image_url"],
      },
    ],
  })
    .then((comment) => {
      res.status(200).json({
        comment,
      });
    })
    .catch((e) => {
      res.status(503).json({
        message: "Gagal Menampilkan Comment",
      });
    });
};

exports.postComment = async (req, res) => {
  let userId = req.userId;
  const { comment, PhotoId } = req.body;
  await Photo.findOne({ where: { id: PhotoId } }).then((photo) => {
    if (!photo) {
      return res.status(401).json({
        message: `photo with id ${PhotoId} not found`,
      });
    }
    return Comment.create({
      comment,
      PhotoId: PhotoId,
      UserId: userId,
    })
      .then((comment) => {
        res.status(201).json({
          id: comment.id,
          comment: comment.comment,
          PhotoId: comment.PhotoId,
          UserId: comment.UserId,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        });
      })
      .catch((e) => {
        res.status(503).json({
          message: "Gagal Membuat Comment",
        });
      });
  });
};

exports.putComment = async (req, res) => {
  let userId = req.userId;
  let commentId = req.params.commentId;
  const { comment } = req.body;
  const comments = await Comment.findByPk(commentId);
  let data = {
    comment,
  };
  if (comments?.UserId !== userId) {
    return res.status(401).json({
      message: "Anda Tidak Memiliki Akses Untuk Mengubah Comment Ini",
    });
  }
  await Comment.update(data, {
    where: {
      id: commentId,
    },
    returning: true,
  })
    .then((comment) => {
      res.status(200).json({
        comment: comment[1],
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal Mengubah Data",
      });
    });
};

exports.deleteComment = async (req, res) => {
  let userId = req.userId;
  let commentId = req.params.commentId;
  const comment = await Comment.findByPk(commentId);
  if (comment?.UserId !== userId) {
    return res.status(401).json({
      message: "Anda Tidak Memiliki Akses Untuk Mendelete Comment Ini",
    });
  }
  await Comment.destroy({
    where: {
      id: commentId,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Your Comment Has Been successfully deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal Menghapus Comment",
      });
    });
};
