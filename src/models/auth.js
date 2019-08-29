import pool from '../database/config';
import passwordHash from 'password-hash';

class User{
    
    constructor(firstName, lastName, email, password, address){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.address = address
    }

    async addUser(){
            const hashedPassword =  this.hashPassword(this.password);
            const addUserQuery = `INSERT INTO Users(firstName, lastName, email, password, address) values($1, $2, $3, $4, $5) returning *`;
            const insertedUser =  await pool.query(addUserQuery, [this.firstName, this.lastName, this.email, hashedPassword, this.address]);
            return insertedUser.rows[0];
    }

    hashPassword(password){
        return passwordHash.generate(password);
    }

    static async signInUser(email, password){
        const getUserQuery = `SELECT * FROM Users where email = $1`;
        const availableUser = await pool.query(getUserQuery, [email]);
    
        if(availableUser.rows.length > 0){
            const storedPassword = availableUser.rows[0].password;
            const verifyPassword = passwordHash.verify(password, storedPassword)
            if(verifyPassword){
                return availableUser.rows[0]
            }
            else{
                return false
            }
        }
        else {
            return false
        }

    }


}


export default User;