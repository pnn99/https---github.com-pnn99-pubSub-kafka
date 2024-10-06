const User = require('../models/userModel');

// Simulação de banco de dados em memória
const users = [];

exports.register = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (user) {
        return res.status(400).json({ message: 'Usuário já existe.' });
    }

    users.push({ email, password });
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    res.json({ message: 'Login bem-sucedido!', token: 'fake-jwt-token' });
};
