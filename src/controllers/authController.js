const { name } = require('body-parser');
const { createUser, findUserByEmailOrRA } = require('../models/userModel');
const bcrypt = require('bcrypt');

// Registrar um novo usuário
const register = (req, res) => {
    const { name, ra, email, password } = req.body;

    if (!name || !ra || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Hash da senha
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Criação do usuário
    createUser(name, ra, email, hashedPassword, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao criar usuário.' });
        }
        res.status(201).json({ message: 'Usuário registrado com sucesso!', user });
    });
};

// Login do usuário
const login = (req, res) => {
    const { identifier, password } = req.body; // O identifier pode ser email ou RA

    if (!identifier || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    findUserByEmailOrRA(identifier, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor.' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        // Armazenar o usuário logado na sessão
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            ra: user.ra
        };

        console.log('Usuário logado:', user.name, user.ra, user.email);
        return res.status(200).json({ message: 'Login bem-sucedido!' });
        
    });
};

module.exports = { register, login };
