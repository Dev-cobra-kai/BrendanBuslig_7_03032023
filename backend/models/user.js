// Models : Permet de créer des schémas de données qui contiennent les champs souhaités
// pour indiquer leur type ainsi que leur caractère (obligatoire ou non)

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
        is: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, // Utilisation d'un regex pour le format d'adresse mail
      },
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    lastName: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },

    firstName: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },

    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    },

    picture: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return User;
};