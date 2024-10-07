const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do arquivo SQLite
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Conectar ao banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite');
    }
});

// Criar tabelas, se não existirem
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dayOfWeek TEXT,
        room TEXT,
        timeSlot TEXT,
        createdAt TEXT
    )`);
});

module.exports = db;
