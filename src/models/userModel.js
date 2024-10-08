const db = require('../config/database');

// Função para criar um novo usuário
const createUser = (name, ra, email, hashedPassword, callback) => {
    const query = `INSERT INTO users (name, ra, email, password) VALUES (?, ?, ?, ?)`;
    db.run(query, [name, ra, email, hashedPassword], function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID, name, ra, email });
    });
};

// Função para buscar um usuário por email ou RA
const findUserByEmailOrRA = (identifier, callback) => {
    const query = `SELECT * FROM users WHERE email = ? OR ra = ?`;
    db.get(query, [identifier, identifier], (err, row) => {
        if (err) {
            return callback(err);
        }
        callback(null, row);
    });
};

module.exports = { createUser, findUserByEmailOrRA };
