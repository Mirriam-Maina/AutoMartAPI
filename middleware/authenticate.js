import jwt from 'jsonwebtoken';
import ErrorHandler from '../helpers/errorHandler';

const pool = require('../database/config');
require('dotenv').config();

export default class Authenticate {
    static signToken(payload){
      let token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          data: payload
        }, process.env.APP_SECRET);
      return token;
    };

    static async decodeToken(req, res, token){
      jwt.verify(token, process.env.APP_SECRET, async (error, decoded)=>{
        if(error){
          ErrorHandler.errorResponse(res, 400, error.message);
        }
        else{
          const user = decoded.data.email;
          const userExistsQuery = `SELECT * FROM Users where email = $1`;
          const userExists = await pool.query(userExistsQuery, [user]);
          userExists.rows.length == 0 ? ErrorHandler.errorResponse(res, 400, 'This token is no longer valid') 
          : req.user = user;
        };
      });
    };

    static async checkToken(req, res, next){
        const token = req.headers.authorization
          || req.body.token
          || req.query.token;
      
          !token ? ErrorHandler.errorResponse(res, 401, 'Please provide a token') : await Authenticate.decodeToken(req, res, token);
    next();
    };

};

  