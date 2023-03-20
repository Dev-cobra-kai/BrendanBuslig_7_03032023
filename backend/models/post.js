// Pour enregistrer un nouvel utilisateur
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.STRING(50),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    message: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    imageUrl: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    link: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  });

  return User;
};

