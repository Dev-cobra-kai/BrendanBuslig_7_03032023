module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    // userId: {
    //   allowNull: false,
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: 'User',
    //     key: 'id'
    //   }
    // },

    title: {
      allowNull: false,
      type: Sequelize.STRING
    },

    content: {
      allowNull: false,
      type: Sequelize.TEXT
    },

    postUrl: {
      allowNull: true,
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

  return Post;
};
