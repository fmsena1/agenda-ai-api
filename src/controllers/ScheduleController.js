const database = require('../database/connections');

const table = 'Agendamento';

class ScheduleController {
    async index(request, response) {
        try {
            const agendamentos = await database(table).select('*');
            return response.json(agendamentos);
        } catch (error) {
            console.error('Erro ao listar agendamentos:', error);
            return response.status(500).json({ message: 'Erro ao listar agendamentos', error: error.message });
        }
    }

    async create(request, response) {
        const { ClienteId, Servico, DataAgendamento, Status } = request.body;

        if (!ClienteId || !Servico || !DataAgendamento || !Status) {
            return response.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
        }

        try {
            await database(table).insert({
                ClienteId,
                Servico,
                DataAgendamento,
                Status
            });

            return response.status(201).json({ message: 'Agendamento criado com sucesso' });
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            return response.status(500).json({ message: 'Erro ao criar agendamento', error: error.message });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            await database(table).where({ id }).delete();
            return response.status(204).send();
        } catch (error) {
            console.error('Erro ao deletar agendamento:', error);
            return response.status(500).json({ message: 'Erro ao deletar agendamento', error: error.message });
        }
    }
}

module.exports = new ScheduleController();
