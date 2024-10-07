const { createUser, findUserByUsername } = require('../models/userModel');
const bcrypt = require('bcrypt');

// Registrar um novo usuário
const register = (req, res) => {
    const { username, password } = req.body; // Certifique-se de que 'username' e 'password' estão corretos
    if (!username || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Hash da senha antes de salvar no banco de dados
    const hashedPassword = bcrypt.hashSync(password, 10);

    createUser(username, hashedPassword, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao criar usuário' });
        }
        res.status(201).json({ message: 'Usuário registrado com sucesso!', user });
    });
};

// Login do usuário
const login = (req, res) => {
    const { username, password } = req.body;

    // Depuração: Verifica se os dados estão sendo recebidos corretamente
    console.log('Dados recebidos no login:', { username, password });

    if (!username || !password) {
        console.log('Faltando campos no login');
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    findUserByUsername(username, (err, user) => {
        if (err) {
            console.log('Erro ao buscar usuário no banco de dados:', err);
            return res.status(500).json({ message: 'Erro no servidor.' });
        }

        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }

        // Depuração: Verifica o hash da senha armazenado
        console.log('Usuário encontrado:', user);

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            console.log('Senha incorreta');
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        console.log('Login bem-sucedido');
        return res.status(200).json({ message: 'Login bem-sucedido!' });
    });
};

module.exports = { register, login };
