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

      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  
    return Like;
  };
  