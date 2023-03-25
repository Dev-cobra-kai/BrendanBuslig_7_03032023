// Importer JsonWebToken d'authentification (Permet de fournir un niveau de sécurité supplémentaire pour accéder aux données ou à un réseau)
const jwt = require('jsonwebtoken');
// Importer du module fs de node.js pour accéder aux fichiers du serveur
const fs = require('fs');
// Importer les models de sequelize
const db = require('../models');

// Créer un nouveau commentaire
exports.createComment = (req, res, next) => {
    // Nous avons besoin de récupérer l'userId par l'intermédiaire du token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
  
    db.Post.findOne({
      where: {
        id: req.params.id || null,
        UserID: userId,
      },
    });
    db.Comment.create({
      comment: req.body.comment,
      PostId: req.params.postId,
      UserId: userId,
    })
      .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
  
      .catch((error) => res.status(400).json({ error }));
  };

// Afficher toutes les commentaires
exports.getAllComment = (req, res, next) => {
    // Utilisation de find() pour voir toutes les users
    Comment.findAll({
        attributes: [
            // Le tableau correspond aux informations demandées à la BDD
            "id",
            "comment",
        ],
    })
        .then((comments) => res.status(200).json(comments))

        .catch((error) => res.status(500).json({ error }));
};

// Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
        .then(comment => {
            if (comment.userId != req.auth.userId) {
                res.status(401).json({ message: 'Pas autorisé' });
            } else {
                const filename = comment.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Comment.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

