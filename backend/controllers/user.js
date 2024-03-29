// Importer les models de sequelize
const db = require('../models');
// Importer Bcrypt pour hasher le password (Empêche de récupérer les données personnelles)
const bcrypt = require('bcrypt');
// Importer JsonWebToken d'authentification (Permet de fournir un niveau de sécurité supplémentaire pour accéder aux données ou à un réseau)
const jwt = require('jsonwebtoken');
// Importer du module fs de node.js pour accéder aux fichiers du serveur
const fs = require('fs');

// Créer un nouvel user dans la BDD (sign up)
exports.signup = (req, res, next) => {
  // Hasher le password avant de l'envoyer dans la BDD  
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      // Eléments enregistrés dans la BDD
      db.User.create({
        email: req.body.email,
        password: hash,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        isAdmin: false,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error: 'Formulaire non valide ! Veuillez ressaisir vos données' }));
    })
    .catch(error => res.status(500).json({ error: 'Erreur côté serveur' }));
};

// Connecter un user dans la BDD (login)
exports.login = (req, res, next) => {
  // Rechercher si le mail est présent dans la BDD
  db.User.findOne({where: { email: req.body.email }})
    .then(user => {
      if (!user) { return res.status(401).json({ error: 'Utilisateur non trouvé !' }); }
      // Controler validité du password
      bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
          // Si le password est incorrect
          if (!valid) { return res.status(401).json({ error: 'Mot de passe incorrect !' }); }
          // Password correct
          res.status(200).json({
            // Encodage du userId
            userId: user.id,
            userAdmin: user.isAdmin,
            token: jwt.sign(
              {
                userId: user.id,
                isAdmin: user.isAdmin
              },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            ),
            message: 'Utilisateur Connecté !'
          });
        })
        .catch(error => res.status(500).json({ error: 'Erreur côté password' }));
    })
    .catch(error => res.status(500).json({ error: 'Erreur côté email' }));
};

// Afficher tous les users
exports.getAllUser = (req, res, next) => {
  // Utilisation de findAll() pour voir toutes les users
  db.User.findAll()
    .then(users => {
      console.log(users);
      res.status(200).json({ data: users });
    })
    .catch(error => res.status(400).json({ error }));
};

// Afficher un user
exports.getOneUser = (req, res, next) => {
  db.User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json({ error }));
};

// Modifier un user
exports.modifyUser = (req, res, next) => {
  // éléments de la requète
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  // vérification que tous les champs sont remplis
  if (email === null || email === '' || firstname === null || firstname === '' || lastname === null || lastname === '') {
    return res.status(400).json({ 'error': "Les champs 'nom' et 'prénom' doivent être remplis " });
  }
  // gestion d'ajout/modification image de profil
  const userObject = req.file ?
    {
      ...req.body.user,
      imageUrl: req.file.filename
    } : { ...req.body };

  db.User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

// Supprimer un user
exports.deleteUser = (req, res, next) => {
  db.Like.destroy({ where: { userId: req.params.id } })
    .then(() =>
      db.Comment.destroy({ where: { userId: req.params.id } })
        .then(() =>
          db.Post.findAll({ where: { userId: req.params.id } })
            .then(
              (posts) => {
                posts.forEach(
                  (post) => {
                    db.Comment.destroy({ where: { postId: post.id } })
                    db.Like.destroy({ where: { postId: post.id } })
                    db.Post.destroy({ where: { id: post.id } })
                  }
                )
              }
            )
            .then(() =>
              db.User.findOne({ where: { id: req.params.id } })
                .then(user => {
                  const filename = user.imageUrl;
                  fs.unlink(`images/${filename}`, () => {
                    db.User.destroy({ where: { id: req.params.id } })
                      .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                  })
                })
            )
        )
    )
    .catch(error => res.status(400).json({ error }));
};
