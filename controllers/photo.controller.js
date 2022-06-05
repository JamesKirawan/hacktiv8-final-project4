const { Photo, User, Comment } = require("../models");

exports.getPhoto = async (req, res) => {
  let userId = req.userId;
  await Photo.findAll({
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Comment,
        include: [
          {
            model: User,
            as: "user",
          },
        ],
        as: "comment",
      },
    ],
  })
    .then((photo) => {
      let photos = [];
      for (i = 0; i < photo.length; i++) {
        let comments = [];
        if (photo[i].dataValues.comment.length > 0) {
          for (j = 0; j < photo[i].dataValues.comment.length; j++) {
            comments.push({
              comment: photo[i].dataValues.comment[j].comment,
              User: {
                username: photo[i].dataValues.comment[j].user.username,
              },
            });
          }
          photos.push({
            id: photo[i].dataValues.id,
            poster_image_url: photo[i].dataValues.poster_image_url,
            title: photo[i].dataValues.title,
            caption: photo[i].dataValues.caption,
            UserId: photo[i].dataValues.UserId,
            createdAt: photo[i].dataValues.createdAt,
            updatedAt: photo[i].dataValues.updatedAt,
            User: {
              id: photo[i].dataValues.user.id,
              username: photo[i].dataValues.user.username,
              profile_image_url: photo[i].dataValues.user.profile_image_url,
            },
            Comments: comments,
          });
        } else {
          photos.push({
            id: photo[i].dataValues.id,
            poster_image_url: photo[i].dataValues.poster_image_url,
            title: photo[i].dataValues.title,
            caption: photo[i].dataValues.caption,
            UserId: photo[i].dataValues.UserId,
            createdAt: photo[i].dataValues.createdAt,
            updatedAt: photo[i].dataValues.updatedAt,
            Comments: [],
            User: {
              id: photo[i].dataValues.user.id,
              username: photo[i].dataValues.user.username,
              profile_image_url: photo[i].dataValues.user.profile_image_url,
            },
          });
        }
      }
      res.status(200).json({
        photos,
      });
    })
    .catch((e) => {
      res.status(503).send({
        message: "Gagal Memuat Photo",
      });
    });
};

exports.postPhoto = async (req, res) => {
  let userId = req.userId;
  const { poster_image_url, title, caption } = req.body;
  await Photo.create({
    poster_image_url,
    title,
    caption,
    UserId: userId,
  })
    .then((photo) => {
      res.status(201).json({
        id: photo.id,
        poster_image_url: photo.poster_image_url,
        title: photo.title,
        caption: photo.caption,
        UserId: photo.UserId,
      });
    })
    .catch((e) => {
      res.status(503).json({
        message: "Gagal Membuat Photo",
      });
    });
};

exports.putPhoto = async (req, res) => {
  let userId = req.userId;
  let photoId = req.params.photoId;
  const { poster_image_url, title, caption } = req.body;
  const photo = await Photo.findByPk(photoId);
  let data = {
    poster_image_url,
    title,
    caption,
  };
  if (photo?.UserId !== userId) {
    return res.status(401).json({
      message: "Anda Tidak Memiliki Akses Untuk Mengubah Photo Ini",
    });
  }
  await Photo.update(data, {
    where: {
      id: photoId,
    },
    returning: true,
    plain: true,
  })
    .then((photo) => {
      res.status(200).json({
        photo: {
          id: photo[1].dataValues.id,
          title: photo[1].dataValues.title,
          caption: photo[1].dataValues.caption,
          poster_image_url: photo[1].dataValues.poster_image_url,
          userId: photo[1].dataValues.UserId,
          createdAt: photo[1].dataValues.createdAt,
          updatedAt: photo[1].dataValues.updatedAt,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal Mengubah Data",
      });
    });
};

exports.deletePhoto = async (req, res) => {
  let userId = req.userId;
  let photoId = req.params.photoId;
  const photo = await Photo.findByPk(photoId);
  if (photo?.UserId !== userId) {
    return res.status(401).json({
      message: "Anda Tidak Memiliki Akses Untuk Mendelete Photo Ini",
    });
  }
  await Photo.destroy({
    where: {
      id: photoId,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Your Photo Has Been successfully deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal Menghapus Photo",
      });
    });
};
