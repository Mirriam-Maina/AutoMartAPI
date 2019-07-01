import jwt from 'jsonwebtoken';

class Authenticate {
    static async signToken(req, res, next){


    }

    static async checkToken(req, res, next){
        const token = req.headers.authorization
          || req.body.token
          || req.query.token;
      
        if (!token) {
          return res.status(401).json({
            success: false,
            error: 'Please provide a token',
          });
        }
    next();
    };
   

}

  
  export default Authenticate;
  