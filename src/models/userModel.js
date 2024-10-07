const db = require('../config/database');

// Função para criar um novo usuário
const createUser = (username, hashedPassword, callback) => {
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(query, [username, hashedPassword], function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID, username });
    });
};

// Função para buscar um usuário pelo nome
const findUserByUsername = (username, callback) => {
    const query = `SELECT * FROM users WHERE username = ?`;
    db.get(query, [username], (err, row) => {
        if (err) {
            return callback(err);
        }
        callback(null, row); // Retorna o usuário encontrado
    });
};

module.exports = { createUser, findUserByUsername };
