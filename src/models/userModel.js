const db = require('../config/database');

// Função para criar um novo usuário
const createUser = (username, password, callback) => {
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(query, [username, password], function (err) {
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
        callback(null, row);
    });
};

module.exports = { createUser, findUserByUsername };
