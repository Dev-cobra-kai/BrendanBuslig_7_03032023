// Controllers : Permet de mettre tous les codes d'implémentation de routes

const Profil = require('../models/profil');
const fs = require('fs');

// Afficher tous les profils
exports.getAllProfil = (req, res, next) => {
    // Utilisation de find() pour voir toutes les profils users
    Profil.find()
        .then((profils) => { res.status(200).json(profils) })
        .catch((error) => { res.status(400).json({ error }) });
};

// Afficher un profil 
exports.getOneProfil = (req, res, next) => {
    Profil.findOne({ _id: req.params.id })
        .then((profil) => { res.status(200).json(profil) })
        .catch((error) => { res.status(404).json({ error }) });
};

// Créer un nouveau profil
exports.createProfil = (req, res, next) => {
    const profilObject = JSON.parse(req.body.profil);
    delete profilObject._id;
    const profil = new Profil({
        ...profilObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    profil.save()
        .then(() => res.status(201).json({ message: 'Nouveau profil créée !' }))
        .catch(error => res.status(400).json({ error }));
};

// Modifier un profil
exports.modifyProfil = (req, res, next) => {
    const profilObject = req.file ? {
        ...JSON.parse(req.body.profil),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete profilObject._userId;
    Profil.findOne({ _id: req.params.id })
        .then((profil) => {
            if (profil.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                Profil.updateOne({ _id: req.params.id }, { ...profilObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Profil modifié !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// // Supprimer un profil
exports.deleteProfil = (req, res, next) => {
    Profil.findOne({ _id: req.params.id })
        .then(profil => {
            if (profil.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = profil.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Profil.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Profil supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

// Liker et disliker
exports.likeProfil = (req, res, next) => {
    const profilLikeObject = req.body;
    console.log(profilLikeObject);
    Profil.findOne({ _id: req.params.id })
        .then((profil) => {
            // like = +1
            if ((!profil.usersLiked.includes(req.body.userId)) && (req.body.like == 1)) {
                Profil.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Like ajouté" }))
                    .catch((error) => { res.status(400).json({ error }) });
            };
            // like = 0
            if ((profil.usersLiked.includes(req.body.userId)) && (req.body.like == 0)) {
                Profil.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Like supprimé" }))
                    .catch((error) => { res.status(400).json({ error }) });
            }
            // like = -1 (dislike = +1)
            if ((!profil.usersDisliked.includes(req.body.userId)) && (req.body.like == -1)) {
                Profil.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Dislike ajouté" }))
                    .catch((error) => { res.status(400).json({ error }) });
            };
            // dislike = 0
            if ((profil.usersDisliked.includes(req.body.userId)) && (req.body.like == 0)) {
                Profil.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }, _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Dislike supprimé" }))
                    .catch((error) => { res.status(400).json({ error }) });
            }
        })
        .catch((error) => res.status(404).json({ error }));
};