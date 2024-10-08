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

// Inicializar o banco de dados
db.serialize(() => {
    // Criar a tabela de usuários se ela não existir
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        ra TEXT,
        email TEXT,
        password TEXT
    )`);

    // Verificar e adicionar a coluna 'name' se não existir
    db.run(`ALTER TABLE users ADD COLUMN name TEXT`, (err) => {
        if (err && !err.message.includes('duplicate column name')) {
            console.error('Erro ao adicionar coluna "name":', err.message);
        }
    });

    // Verificar e adicionar a coluna 'ra' se não existir
    db.run(`ALTER TABLE users ADD COLUMN ra TEXT`, (err) => {
        if (err && !err.message.includes('duplicate column name')) {
            console.error('Erro ao adicionar coluna "ra":', err.message);
        }
    });
    // Criar a tabela de reservas se ela não existir
    db.run(`CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dayOfWeek TEXT,
        room TEXT,
        timeSlot TEXT,
        floor TEXT,
        createdAt TEXT
    )`);
});

module.exports = db;
