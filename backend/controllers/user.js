// Controllers : Permet de mettre tous les codes d'implémentation de routes

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
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        admin: false,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))        
        .catch((error) => res.status(400).json({ error: 'Erreur côté client' }));
    })
    .catch(error => res.status(500).json({ error: 'Erreur côté serveur' }));
};

// Connecter un user dans la BDD (login)
exports.login = (req, res, next) => {
  // Rechercher si le mail est présent dans la BDD
  db.User.findOne({ email: req.body.email })
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
            userId: user._id,
            userAdmin: user.isAdmin,
            token: jwt.sign(
                {  userId: user.id, 
                  isAdmin : user.isAdmin  },
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
  db.User.findAll({
    attributes: [
      // Le tableau correspond aux informations demandées à la BDD
      "id",
      "firstName",
      "lastName",
      "email",
      "picture",
    ],
  })
    .then((users) => res.status(200).json(users))

    .catch((error) => res.status(500).json({ error }));
};

// Afficher un user
exports.getOneUser = (req, res, next) => {
  db.User.findOne({where: {id: req.params.id,
    },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json({ error }));
};

// Modifier un user
exports.modifyUser = async (req, res, next) => {
  let newPicture;
  let user = await db.User.findOne({ where: { id: req.params.id } });

  // Si nouvelle image transmise celle ci est enregistrée
  if (req.file) {
    newPicture = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  // Si nouvelle image, et image précédente existante, cette dernière est supprimée
  if (newPicture && user.picture) {
    const filename = user.picture.split("/images/")[1];
    fs.unlink(`images/${filename}`, (error) => {
      if (error) console.log(error);
      else {
        console.log(`Deleted file: images/${filename}`);
      }
    });
  }
  db.User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      db.User.update(
        {
          email: req.body.email,  
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          picture: newPicture, 
        },
        {
          where: { id: req.params.id },
        }
      )
        .then(() => res.status(200).json({ message: "Compte mis à jour !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Supprimer un user
exports.deleteUser = (req, res, next) => {
  db.User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (user.picture !== null) {
        // Si photo de profil présente on la supprime du répertoire, puis on supprime l'user de la BDD
        const filename = user.picture.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          db.User.destroy({ where: { id: req.params.id } });
          res.status(200).json({ message: "Compte supprimé !" });
        });
      } else { // Sinon on supprime uniquement l'user
        db.User.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Compte supprimé !" });
      }
    })

    .catch((error) => res.status(500).json({ error }));
};
