// Importer JsonWebToken d'authentification (Permet de fournir un niveau de sécurité supplémentaire pour accéder aux données ou à un réseau)
const jwt = require('jsonwebtoken');
// Importer du module fs de node.js pour accéder aux fichiers du serveur
const fs = require('fs');
// Importer les models de sequelize
const db = require('../models');

// Afficher toutes les posts
exports.getAllPost = (req, res, next) => {
    // Utilisation de find() pour voir toutes les users
    Post.findAll({
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
    Post.findOne({
        where: {
            id: req.params.id,
        },
    })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(500).json({ error }));
};

// Créer un nouveau post
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

    });
    post.save()
        .then(() => res.status(201).json({ message: 'Nouveau Post créé !' }))
        .catch(error => res.status(400).json({ error }));
};

// Modifier un post
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete posteObject._userId;
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Pas autorisé' });
            } else {
                Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Post modifié !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Pas autorisé' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
};





