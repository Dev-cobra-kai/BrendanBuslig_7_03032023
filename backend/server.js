const http = require("http"); // Importer le package HTTP de node.js
const app = require("./app"); // Importer l'application app.js

// Importer le package pour utiliser les variables d'environnements
const dotenv = require('dotenv');
const result = dotenv.config()
if (result.error) {
    throw result.error
}
console.log(result.parsed)

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Paramètrage du port avec la méthode set de Express
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Methode qui retourne une nouvelle instance de http.server
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// Demarre le serveur HTTP et écoute les connexions
server.listen(port);
