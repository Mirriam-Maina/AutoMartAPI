import User from '../../models/auth';
import middleware from '../../middleware';

const { Authenticate } = middleware;
const omit = require('object.omit');

export default class AuthController {
    static async signup(req, res){
        const { email, firstName, lastName, password, address } = req.body;
        let jwtToken = Authenticate.signToken({email});
        let newUser = new User(firstName, lastName, email, password, address);
        let createdUser = await newUser.addUser();
        return res.status(201).json({
            status: 201,
            message: "User successfully created",
            data: omit(createdUser, 'password'),
            token: jwtToken
        })
    }

    static async signin(req, res){
        const { email, password } = req.body;
        let signInUser = await User.signInUser(email, password)
        let jwtToken = Authenticate.signToken({email});
        if (signInUser){
            return res.status(200).json({
                status: 200,
                message: "User successfully logged in",
                data: omit(signInUser, 'password'),
                token: jwtToken
            })
        }
        else if(signInUser === false){
            return res.status(400).json({
                status: 400,
                error: "Incorrect username or password",
            })
        }
    }
}

