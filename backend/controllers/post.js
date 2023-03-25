// Importer JsonWebToken d'authentification (Permet de fournir un niveau de sécurité supplémentaire pour accéder aux données ou à un réseau)
const jwt = require('jsonwebtoken');
// Importer du module fs de node.js pour accéder aux fichiers du serveur
const fs = require('fs');
// Importer les models de sequelize
const db = require('../models');


// Créer un post
exports.createPost = (req, res, next) => {
  // const token = req.headers.authorization.split(" ")[1];
  // const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  // const userId = decodedToken.userId;
  const postObject = req.body;
  delete postObject._id;
  const userId = req.body.userId;
  if (req.file) {
    postObject.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename
      }`;
  }
  db.Post.create({
    ...postObject,
    message: req.body.message,
    // imageUrl: imageUrl,
    userId: userId,
    link: req.body.link,
  })
    .then(() => res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(400).json({ message: "Erreur Post !" }));
};


// Afficher toutes les posts
exports.getAllPost = (req, res, next) => {
    // Utilisation de find() pour voir toutes les users
    db.Post.findAll({
        attributes: [
            // Le tableau correspond aux informations demandées à la BDD
            "id",
            "message",
            "imageURL",
            "link",
        ],
    })
        .then((posts) => res.status(200).json(posts))

        .catch((error) => res.status(500).json({ error }));
};

// Afficher un user
exports.getOnePost = (req, res, next) => {
    db.Post.findOne({
        where: {
            id: req.params.id,
        },
    })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(500).json({ error }));
};

// // Modifier un post
exports.modifyPost = async (req, res, next) => {
  let newImageUrl;
  let post = await db.Post.findOne({ where: { id: req.params.id } });
  // Await important ! findOne doit s'éxécuter AVANT post.imageURL !

  // Si nouvelle image celle ci est enregistrée
  if (req.file) {
    newImageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  // Si nouvelle image, et image précédente existante, cette dernière est supprimée
  if (newImageUrl && post.imageURL) {
    const filename = post.imageURL.split("/images/")[1];
    fs.unlink(`images/${filename}`, (error) => {
      if (error) console.log(error);
      else {
        console.log(`Deleted file: images/${filename}`);
      }
    });
  }

  db.Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      db.Post.update(
        {
          message: req.body.message,
          imageURL: newImageUrl, // Si nouvelle image, son chemin est enregistré dans la BDD
          link: req.body.link,
        },
        {
          where: { id: req.params.id },
        }
      )
        .then(() => res.status(200).json({ message: "Post mis à jour !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
  db.Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      if (post.imageURL !== null) {
        // Si image présente on la supprime du répertoire, puis on supprime le post de la BDD
        const filename = post.imageURL.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          db.Post.destroy(
            { where: { id: post.id } },
            { truncate: true, restartIdentity: true }
          );
          res.status(200).json({ message: "Post supprimé !" });
        });
      } else { // Sinon on supprime uniquement le post
        db.Post.destroy(
          { where: { id: post.id } },
          { truncate: true, restartIdentity: true }
        );
        res.status(200).json({ message: "Post supprimé !" });
      }
    })

    .catch((error) => res.status(500).json({ error }));
};


