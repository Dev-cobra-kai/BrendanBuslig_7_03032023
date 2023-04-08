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

    // createdAt: {
    //   allowNull: false,
    //   type: Sequelize.DATE
    // },

    // updatedAt: {
    //   allowNull: false,
    //   type: Sequelize.DATE
    // }
  });

  return Comment;
};
