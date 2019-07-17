import pool from '../database/config';

export default checkAdmin = async(user) => {
    const checkUserQuery = `SELECT * FROM Users where email = $1 and is_admin = true`;
    const checkUser = await pool.query(checkUserQuery, [user]);
    return checkUser.rows.length > 0 ? true : false;
};