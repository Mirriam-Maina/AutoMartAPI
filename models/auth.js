const pool = require('../database/config');
const passwordHash = require('password-hash');

class User{

    constructor(firstName, lastName, email, password, address){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.address = address
    }

    async addUser(){
        let userExistsQuery = `SELECT * FROM Users where email = $1`;
        let userExists = await pool.query(userExistsQuery, [this.email]);
        if (userExists.rows.length > 0){
            return 'User exists'
        }
        else{
            let hashedPassword =  this.hashPassword(this.password);
            let addUserQuery = `INSERT INTO Users(firstName, lastName, email, password, address) values($1, $2, $3, $4, $5) returning *`;
            let insertedUser =  await pool.query(addUserQuery, [this.firstName, this.lastName, this.email, hashedPassword, this.address]);
            return insertedUser.rows[0];
        } 
    }

    hashPassword(password){
        return passwordHash.generate(password);
    }


}


export default User;