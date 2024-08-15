const database = require('../database/connections');
const jwt = require('jsonwebtoken');
const secret = 'your_secret_key'; // Substitua por uma chave secreta segura

class AuthController {
    async register(request, response) {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
        }

        try {
            await database('users').insert({
                name,
                email,
                password,
            });

            return response.status(201).json({ message: 'Usuário registrado com sucesso' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao registrar usuário', error });
        }
    }

    async login(request, response) {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
        }

        try {
            const user = await database('users').where({ email, password }).first();

            if (!user) {
                return response.status(401).json({ message: 'Credenciais inválidas' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

            return response.status(200).json({ message: 'Login bem-sucedido', token });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao fazer login', error });
        }
    }
}

module.exports = new AuthController();
