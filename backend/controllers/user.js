// Controllers : Permet de mettre tous les codes d'implémentation de routes

// Importer Bcrypt pour hasher le password (Empêche de récupérer les données personnelles)
const bcrypt = require('bcrypt');
// Importer JsonWebToken d'authentification (Permet de fournir un niveau de sécurité supplémentaire pour accéder aux données ou à un réseau)
const jwt = require('jsonwebtoken');
// Importer du module fs de node.js pour accéder aux fichiers du serveur
const fs = require('fs');
// Importer les models de sequelize
const db = require("../models");

// // Inscrire un nouvel user dans la BDD (sign up)
exports.signup = (req, res, next) => {
  // Hasher le password avant de l'envoyer dans la BDD
 bcrypt.hash(req.body.password, 10)
     .then(hash => {
         // Eléments enregistrés dans MongoDB
         const user = new User({
             email: req.body.email,
             password: hash
         });
         user.save()
             .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
             .catch(error => res.status(400).json({ error }));
     })
     .catch(error => res.status(500).json({ error }));
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

  const { email, password } = req.body;
  const user = new User(email, password);

  // Controler validité du password
  // bcrypt
  //   .compare(req.body.password, user.password)
  //   .then(controlPassword) => {
  //     // Si le password est incorrect
  //     if (!controlPassword) {
  //       return res
  //         .status(401)
  //         .json({ error: 'Mot de passe incorrect !' });
  //     }
    
      mysqldb.query("SELECT * FROM user WHERE email = ?", email, (error, results) => {
        if (error) {
          console.log('Erreur');
          res.json({ error });
        } else {
          // L'email de l'utilisateur n'est pas présent dans la base de donnée
          // console.log("-->results");
          console.log('Pas erreur');
          res.json({ message : results [0]});
          }
        })
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
};

// Afficher tous les users
exports.getAllUser = (req, res, next) => {
  // Utilisation de find() pour voir toutes les users
  User.find()
    .then((users) => { res.status(200).json(users) })
    .catch((error) => { res.status(400).json({ error }) });
};

// get all employees
// exports.getAllUser = (req, res)=> {
//   //console.log('here all employees list');
//   User.getAllUser((err, employees) =>{
//       console.log('We are here');
//       if(err)
//       res.send(err);
//       console.log('Employees', employees);
//       res.send(employees)
//   })
// }

// // Afficher un user
// exports.getOneProfil = (req, res, next) => {
//     Profil.findOne({ _id: req.params.id })
//         .then((profil) => { res.status(200).json(profil) })
//         .catch((error) => { res.status(404).json({ error }) });
// };

// // Créer un nouvel user
// exports.createUser = (req, res, next) => {
//     const userObject = JSON.parse(req.body.user);
//     delete userObject._id;
//     const user = new User({
//         ...userObject,
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
//     });
//     user.save()
//         .then(() => res.status(201).json({ message: 'Nouvel User créé !' }))
//         .catch(error => res.status(400).json({ error }));
// };

exports.createUser = (req, res) => {
  const userData = new User(req.body);
  console.log('userData', userData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: 'Please fill all fields' });
  } else {
    User.createUser(userData, (err, user) => {
      if (err)
        res.send(err);
      res.json({ status: true, message: 'User Created Successfully', data: user.insertId })
    })
  }
}

// // Modifier un user
// exports.modifyProfil = (req, res, next) => {
//     const profilObject = req.file ? {
//         ...JSON.parse(req.body.profil),
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : { ...req.body };

//     delete profilObject._userId;
//     Profil.findOne({ _id: req.params.id })
//         .then((profil) => {
//             if (profil.userId != req.auth.userId) {
//                 res.status(401).json({ message: 'Not authorized' });
//             } else {
//                 Profil.updateOne({ _id: req.params.id }, { ...profilObject, _id: req.params.id })
//                     .then(() => res.status(200).json({ message: 'Profil modifié !' }))
//                     .catch(error => res.status(401).json({ error }));
//             }
//         })
//         .catch((error) => {
//             res.status(400).json({ error });
//         });
// };

// // // Supprimer un user
// exports.deleteProfil = (req, res, next) => {
//     Profil.findOne({ _id: req.params.id })
//         .then(profil => {
//             if (profil.userId != req.auth.userId) {
//                 res.status(401).json({ message: 'Not authorized' });
//             } else {
//                 const filename = profil.imageUrl.split('/images/')[1];
//                 fs.unlink(`images/${filename}`, () => {
//                     Profil.deleteOne({ _id: req.params.id })
//                         .then(() => res.status(200).json({ message: 'Profil supprimé !' }))
//                         .catch(error => res.status(400).json({ error }));
//                 });
//             }
//         })
//         .catch(error => res.status(500).json({ error }));
// };

// // Liker et disliker
// exports.likeProfil = (req, res, next) => {
//     const profilLikeObject = req.body;
//     console.log(profilLikeObject);
//     Profil.findOne({ _id: req.params.id })
//         .then((profil) => {
//             // like = +1
//             if ((!profil.usersLiked.includes(req.body.userId)) && (req.body.like == 1)) {
//                 Profil.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }, _id: req.params.id })
//                     .then(() => res.status(201).json({ message: "Like ajouté" }))
//                     .catch((error) => { res.status(400).json({ error }) });
//             };
//             // like = 0
//             if ((profil.usersLiked.includes(req.body.userId)) && (req.body.like == 0)) {
//                 Profil.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }, _id: req.params.id })
//                     .then(() => res.status(201).json({ message: "Like supprimé" }))
//                     .catch((error) => { res.status(400).json({ error }) });
//             }
//             // like = -1 (dislike = +1)
//             if ((!profil.usersDisliked.includes(req.body.userId)) && (req.body.like == -1)) {
//                 Profil.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }, _id: req.params.id })
//                     .then(() => res.status(201).json({ message: "Dislike ajouté" }))
//                     .catch((error) => { res.status(400).json({ error }) });
//             };
//             // dislike = 0
//             if ((profil.usersDisliked.includes(req.body.userId)) && (req.body.like == 0)) {
//                 Profil.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }, _id: req.params.id })
//                     .then(() => res.status(201).json({ message: "Dislike supprimé" }))
//                     .catch((error) => { res.status(400).json({ error }) });
//             }
//         })
//         .catch((error) => res.status(404).json({ error }));
// };
