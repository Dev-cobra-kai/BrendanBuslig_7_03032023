// Exporter le model comment
module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comment", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    postId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Post',
        key: 'id'
      }
    },

    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },

    content: {
      allowNull: false,
      type: Sequelize.STRING
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

  Comment.associate = (models) => {
    User.belongsToMany(models.Post, {
      through: models.Comment,
      foreignKey: 'userId',
      otherKey: 'postId',
    });

    Post.belongsToMany(models.User, {
      through: models.Comment,
      foreignKey: 'postId',
      otherKey: 'userId',
    });

    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post',
    });
  };

  return Comment;
};
