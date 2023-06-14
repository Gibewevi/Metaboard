import { Pool } from 'pg';

// configure PostGres connection
const pool = new Pool({
    host: 'localhost', // or '127.0.0.1'
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

export default pool;
