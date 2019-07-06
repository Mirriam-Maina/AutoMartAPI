import jwt from 'jsonwebtoken';

const pool = require('../database/config');
require('dotenv').config();

class Authenticate {
    static signToken(payload){
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: payload
      }, process.env.APP_SECRET);
    return token;
    }

    static async checkToken(req, res, next){
        const token = req.headers.authorization
          || req.body.token
          || req.query.token;
      
        if (!token) {
          return res.status(401).json({
            status: 401,
            error: 'Please provide a token',
          });

        }
        else{

          jwt.verify(token, process.env.APP_SECRET, async (error, decoded)=>{
            if(error){
              return res.status(400).json({
                status: 400,
                error: error.message
              });
            }
            else{
              const user = decoded.data.email;
              const userExistsQuery = `SELECT * FROM Users where email = $1`;
              const userExists = await pool.query(userExistsQuery, [user]);
              if(userExists.rows.length == 0){
                return res.status(400).json(
                  {
                    status: 400,
                    error: 'This token is no longer valid'
                  }
                )
              }
              else{
                req.user = user;
              }
            }

          });
        }
    next();
    };
}

  
  export default Authenticate;
  