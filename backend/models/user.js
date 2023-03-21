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
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        is: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      },
    },

    password: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    nom: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    prenom: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    admin: {
      type: Sequelize.STRING(50),
      allowNull: false,
      default: false,
    },

    photo: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
  });
  return User;
};

