const { Photo, User } = require("../models");

exports.getPhoto = async (req, res) => {
  let userId = req.userId;
  await Photo.findAll({
    where: {
      UserId: userId,
    },
    include: [
      {
        model: User,
        as: "user",
      },
    ],
  })
    .then((photo) => {
      console.log("asd");
      res.status(200).json({
        photos: {
          id: photo[0].dataValues.id,
          poster_image_url: photo[0].dataValues.poster_image_url,
          title: photo[0].dataValues.title,
          caption: photo[0].dataValues.caption,
          UserId: photo[0].dataValues.UserId,
          createdAt: photo[0].dataValues.createdAt,
          updatedAt: photo[0].dataValues.updatedAt,
          User: {
            id: photo[0].dataValues.user.id,
            username: photo[0].dataValues.user.username,
            profile_image_url: photo[0].dataValues.user.profile_image_url,
          },
        },
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
