// Importer des variables d'environnements
const dotenv = require('dotenv');
const result = dotenv.config()
if (result.error) {
    throw result.error
}
console.log(result.parsed)

// Importer mysql
const mysql = require('mysql');

// Se connecter à la base MySQL avec le module mysql
// Les paramètres
const mysqldb = mysql.createConnection({
    host: 'localhost',    
    user: 'root',
    password: '',
    database: 'groupomania',
})
// La connexion
mysqldb.connect((err) => {
    if (err) {
        console.log(`Erreur de connexion à la base de donnée: ${err}`);
    } else {
        console.log("Connexion réussie à la base de donnée - groupomania");
    }
})

module.exports = mysqldb;