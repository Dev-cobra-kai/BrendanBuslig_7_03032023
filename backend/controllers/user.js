// Controllers : Permet de mettre tous les codes d'implémentation de routes

// Importer Bcrypt pour hasher le password (Empêche de récupérer les données personnelles)
const bcrypt = require('bcrypt');
// Importer JsonWebToken d'authentification (Permet de fournir un niveau de sécurité supplémentaire pour accéder aux données ou à un réseau)
const jwt = require('jsonwebtoken');
// Importer du module fs de node.js pour accéder aux fichiers du serveur
const fs = require('fs');
// Importer les models de sequelize
// const db = require('../models');
const User = require('../models');


// Créer un nouvel user dans la BDD (sign up)
exports.signup = (req, res, next) => {
  // Hasher le password avant de l'envoyer dans la BDD  
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      // Eléments enregistrés dans la BDD
      User.create({
        email: req.body.email,
        password: hash,
        nom: req.body.nom,
        prenom: req.body.prenom,
        admin: false,
      });
      user.save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error: 'Erreur côté client' }));
    })
    .catch(error => res.status(500).json({ error: 'Erreur côté serveur' }));
};

// exports.signup = (req, res, next) => {
//   // Hasher le password avant de l'envoyer dans la BDD    
//   bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//       // Eléments à enregistrer dans la table user
//       const db = {
//         email: req.body.email,
//         password: hash,
//       };
//       // la requête SQL pour envoyer les données dans la table user
//       mysqldb.query(
//         "INSERT INTO user SET ?", db,
//         (error, results) => {
//           if (error) {
//             res.status(500).json({ error });
//           } else {
//             res.json({ results: { message: "Utilisateur enregistré" } });
//           }
//         }
//       );
//     })
//     .catch(error => res.status(500).json({ error }));
// };

// Connecter un user dans la BDD (login)
exports.login = (req, res, next) => {
  // Rechercher si le mail est présent dans la BDD
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) { return res.status(401).json({ error: 'Utilisateur non trouvé !' }); }
      // Controler validité du password
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          // Si le password est incorrect
          if (!valid) { return res.status(401).json({ error: 'Mot de passe incorrect !' }); }
          // Password correct
          res.status(200).json({ //({ message: 'Utilisateur trouvé !' })
            // Encodage du userId
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// exports.login = (req, res, next) => {

//   const { email, password } = req.body;
//   const user = new User(email, password);

//   // Controler validité du password
//   // bcrypt
//   //   .compare(req.body.password, user.password)
//   //   .then(controlPassword) => {
//   //     // Si le password est incorrect
//   //     if (!controlPassword) {
//   //       return res
//   //         .status(401)
//   //         .json({ error: 'Mot de passe incorrect !' });
//   //     }

//   mysqldb.query("SELECT * FROM user WHERE email = ?", email, (error, results) => {
//     if (error) {
//       console.log('Erreur');
//       res.json({ error });
//     } else {
//       // L'email de l'utilisateur n'est pas présent dans la base de donnée
//       // console.log("-->results");
//       console.log('Pas erreur');
//       res.json({ message: results[0] });
//     }
//   })
// // Password correct
// res.status(200).json({ //({ message: 'Utilisateur trouvé !' })
//   // Encodage du userId
//   userId: user._id,
//   token: jwt.sign(
//     { userId: user._id },
//     'RANDOM_TOKEN_SECRET',
//     { expiresIn: '24h' }
//   )
// });
//     .catch(error => res.status(500).json({ error: 'Utilisateur non trouvé sur la BDD !' }));
//   })
// };

// Afficher tous les users
exports.getAllUser = (req, res, next) => {
  // Utilisation de find() pour voir toutes les users
  User.findAll({
    attributes: [
      // Le tableau correspond aux informations demandées à la BDD
      "id",
      "email",
      "nom",
      "prenom",
      "photo",
    ],
  })
    .then((users) => res.status(200).json(users))

    .catch((error) => res.status(500).json({ error }));
};

// Afficher un user
exports.getOneUser = (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json({ error }));
};

// Modifier un user
exports.modifyUser = (req, res, next) => {
  const userObject = req.file ? {
    ...JSON.parse(req.body.user),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete userObject._userId;
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user.userId != req.auth.userId) {
        res.status(401).json({ message: 'Pas autorisé' });
      } else {
        User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'User modifié !' }))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Supprimer un user
exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(user => {
      if (user.userId != req.auth.userId) {
        res.status(401).json({ message: 'Pas autorisé' });
      } else {
        const filename = user.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          User.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'User supprimé !' }))
            .catch(error => res.status(400).json({ error }));
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

