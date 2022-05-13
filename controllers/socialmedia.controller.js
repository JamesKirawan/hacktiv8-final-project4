const { Photo, User, SocialMedia } = require("../models");

exports.getSocialMedia = async (req, res) => {
  let userId = req.userId;
  await SocialMedia.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "username", "profile_image_url"],
      },
    ],
  })
    .then((socialmedia) => {
      res.status(200).json({
        socialmedia,
      });
    })
    .catch((e) => {
      res.status(503).json({
        message: "Gagal Menampilkan Social Media",
      });
    });
};

exports.postSocialMedia = async (req, res) => {
  let userId = req.userId;
  const { name, social_media_url } = req.body;
  await SocialMedia.create({
    name,
    social_media_url,
    UserId: userId,
  })
    .then((socialmedia) => {
      res.status(201).json({
        id: socialmedia.id,
        name: socialmedia.name,
        social_media_url: socialmedia.social_media_url,
        UserId: socialmedia.UserId,
        updatedAt: socialmedia.updatedAt,
        createdAt: socialmedia.createAt,
      });
    })
    .catch((e) => {
      res.status(503).json({
        message: "Gagal Membuat Social Media",
      });
    });
};

exports.putSocialMedia = async (req, res) => {
  let userId = req.userId;
  let socialmediaId = req.params.socialmediaId;
  const { name, social_media_url } = req.body;
  const socialmedias = await SocialMedia.findByPk(socialmediaId);
  let data = {
    name,
    social_media_url,
  };
  if (socialmedias.UserId !== userId) {
    return res.status(401).json({
      message: "Anda Tidak Memiliki Akses Untuk Mengubah Social Media Ini",
    });
  }
  await SocialMedia.update(data, {
    where: {
      id: socialmediaId,
    },
    returning: true,
  })
    .then((socialmedia) => {
      res.status(200).json({
        socialmedia: socialmedia[1],
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Gagal Mengubah Data",
      });
    });
};

exports.deleteSocialMedia = async (req, res) => {
  let userId = req.userId;
  let socialmediaId = req.params.socialmediaId;
  const socialmedia = await SocialMedia.findByPk(socialmediaId);
  if (socialmedia.UserId !== userId) {
    return res.status(401).json({
      message: "Anda Tidak Memiliki Akses Untuk Mendelete Social Media Ini",
    });
  }
  await SocialMedia.destroy({
    where: {
      id: socialmediaId,
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
