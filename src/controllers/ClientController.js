const database = require('../database/connections');

class ClientController {
    async index(request, response) {
        const clients = await database('Cliente').select('*');
        return response.json(clients);
    }

    async create(request, response) {
        const { nome, email, telefone, endereco } = request.body;

        if (!nome || !telefone || !endereco) {
            return response.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
        }
        await database('Cliente').insert({
            Nome: nome,
            Email: email,
            Telefone: telefone,
            Endereco: endereco,
        }).table("cliente").then(data => {
            console.log(data);
            response.json({ message: "Cliente cadastrado com sucesso" });
            
        }).catch( error => {
            console.log(error);
            response.json({ message: "Erro ao cadastrar cliente", error: error });
        });

        return response;
    }

    async delete(request, response) {
        const { id } = request.params;

        await database('cliente').where({ ClienteId: id }).delete();

        return response.status(204).send();
    }
}

module.exports = new ClientController();
