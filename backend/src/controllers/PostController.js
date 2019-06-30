const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');
    // caso queira fazer algum filtro, pode colocar a condicao dentro do find(aqui)
    // sort('-createdAt') faz com que a listagem fique mais atuais no top (decresente)

    return res.json(posts);
  },

  async store(req, res) {
    const {
      author, place, description, hashtags,
    } = req.body;
    const { filename: image } = req.file;

    // ver aqui abaixo, caso seja feito um post com gif
    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName),
      );

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
    });

    req.io.emit('post', post);

    return res.json(post);
  },
};
