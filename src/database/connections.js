const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '88070790@Fe',
        database: 'agendaaidb',
        port: 3306
    }
});

module.exports = knex;
