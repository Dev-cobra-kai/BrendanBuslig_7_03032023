// // Se connecter à la base MySQL avec le module sequelize
const mysql = require("../db/mysql.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(mysql.DB, mysql.USER, mysql.PASSWORD, {
  host: mysql.HOST,
  dialect: mysql.dialect,
  operatorsAliases: false,

  pool: {
    max: mysql.pool.max,
    min: mysql.pool.min,
    acquire: mysql.pool.acquire,
    idle: mysql.pool.idle,
  },
});

// Verifier la connexion à la BDD
sequelize.authenticate().then(() => {
  console.log('Connecté à la base de données !');
}).catch((error) => {
  console.error('Impossible de se connecter à la base de données ! ', error);
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user.js')(sequelize, Sequelize);
// db.post = require('./post.js')(sequelize, Sequelize);

module.exports = db