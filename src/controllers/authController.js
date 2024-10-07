const { createUser, findUserByUsername } = require('../models/userModel');
const bcrypt = require('bcrypt');

// Registrar um novo usuário
const register = (req, res) => {
    const { username, password } = req.body;
    
    // Verificar se o usuário já existe
    findUserByUsername(username, (err, user) => {
        if (user) {
            return res.status(409).json({ error: 'Usuário já existe' });
        }

        // Hash da senha
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Criar o usuário
        createUser(username, hashedPassword, (err, newUser) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao criar usuário' });
            }
            res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
        });
    });
};

// Login do usuário
const login = (req, res) => {
    const { username, password } = req.body;

    // Buscar o usuário no banco de dados
    findUserByUsername(username, (err, user) => {
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Verificar a senha
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        res.status(200).json({ message: 'Login bem-sucedido', user });
    });
};

module.exports = { register, login };
