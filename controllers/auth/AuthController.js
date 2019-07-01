import AuthValidation from '../../middleware/AuthValidation'; 


const jwt = require('jsonwebtoken');

export default class AuthController {
    static async signup(req, res){
        const users = [];
        const { email, firstName, lastName } = req.body;
        let jwtToken = signToken({email, firstName, lastName});
        users.push(req.body);
        return res.status(201).json({
            status: 201,
            message: "User successfully created",
            data: users[users.length-1],
            token: jwtToken
        })
    }
}


const signToken = (payload) => {
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: payload
      }, 'secret');
    return token;
}