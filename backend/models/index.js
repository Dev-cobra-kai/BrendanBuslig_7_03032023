// Se connecter à la base MySQL avec le module sequelize
const dbConfig = require('../config/dbConfig');

// const {Sequelize, DataTypes} = require('sequelize');

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
);

// Verifier la connexion à la BDD
sequelize.authenticate().then(() => {
  console.log('Connecté à la base de données !');
}).catch((error) => {
  console.error('Impossible de se connecter à la base de données ! ', error);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/User.js")(sequelize, Sequelize);
db.Post = require('../models/Post.js')(sequelize, Sequelize);

module.exports = db;