import model from './model';
import pool from './model';

const verifyEmailIntoDataBase = async (email) => {
    let client;
    try {
        client = await pool.connect();
        const req = 'SELECT user_email FROM users WHERE user_email = $1';
        const values = [email];
        const res = await client.query(req, values);
        if (res.rows.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false; // Retourner false aussi en cas d'erreur
    } finally {
        client?.release();
    }
}

const getHashPassword = async () => {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        const req = 'SELECT '
    } catch {

    } finally {

    }
};

const insertUser = async (account) => {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        const req = 'INSERT INTO users (user_email, user_password) VALUES($1, $2)';
        const values = [
            account.email,
            account.password
        ]
        const res = await client.query(req, values);
        await client.query('COMMIT');
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
}

export const userModel = {
    insertUser,
    verifyEmailIntoDataBase
};
