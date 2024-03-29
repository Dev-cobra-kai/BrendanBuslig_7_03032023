// Pour enregistrer un nouvel utilisateur (user) dans la BDD
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Utilisation d'un regex pour le format d'adresse mail
      },
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z ,.'-]+$/i, // Utilisation d'un regex pour le format du nom
      },
    },

    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z ,.'-]+$/i, // Utilisation d'un regex pour le format du prénom
      },
    },

    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    },

    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
  // On a besoin d'associer les utilisateurs avec les posts dans mysql, on utilise alors les fonctions de sequelize
  // "models" est juste un argument qui a accès à tous modèles disponible
  // Posts.hasMany(models.Comments) = chaque utilisateur a beaucoup de posts et à la suppression "cascade" permet de supprimer tous les posts/commentaires associés
  // Permet de créer la colonne UserId dans la table Posts
  User.associate = (models) => {
    User.hasMany(models.Post,
      { onDelete: 'cascade' });

    User.hasMany(models.Comment,
      { onDelete: 'cascade' });

    User.hasMany(models.Like,
      { onDelete: 'cascade' });
  };

  return User;
};