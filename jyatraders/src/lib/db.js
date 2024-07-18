const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 10, // Adjust the limit based on your application's requirements
    host: '172.105.48.130',
    user: 'collegec_JyaTrades856',
    password: '^5Ky-ufld6Vo',
    database: 'collegec_jyatrades',
    multipleStatements: true
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log('Error connecting to the database:', err.sqlMessage || err);
        return;
    }
    console.log('Database successfully connected.');
    connection.release(); // Release the connection back to the pool
});

const connection = pool;
module.exports = connection;