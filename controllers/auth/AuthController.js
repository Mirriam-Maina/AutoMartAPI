import AuthValidation from '../../middleware/AuthValidation'; 
import User from '../../models/auth';

const jwt = require('jsonwebtoken');
const omit = require('object.omit');

export default class AuthController {
    static async signup(req, res){
        const { email, firstName, lastName, password, address } = req.body;
        let jwtToken = signToken({email, firstName, lastName});
        let newUser = new User(firstName, lastName, email, password, address);
        let createdUser = await newUser.addUser()
        if (createdUser === 'User exists'){
            return res.status(409).json({
            status: 409,
            message: "This user already exists. Log in instead",
        })
        }
        return res.status(201).json({
            status: 201,
            message: "User successfully created",
            data: omit(createdUser, 'password'),
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