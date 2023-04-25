// Exporter le model like
module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("Like", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },

    postId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Post',
        key: 'id'
      }
    },

    like: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });

  Like.associate = (models) => {
    User.belongsToMany(models.Post, {
      through: models.Like,
      foreignKey: 'userId',
      otherKey: 'postId',
    });

    Post.belongsToMany(models.User, {
      through: models.Like,
      foreignKey: 'postId',
      otherKey: 'userId',
    });

    Like.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    Like.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post',
    });
  };

  return Like;
};
