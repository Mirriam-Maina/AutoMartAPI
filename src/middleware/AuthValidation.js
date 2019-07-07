import Joi from 'joi';
import pool from '../database/config';
import ErrorHandler from '../helpers/errorHandler';


const SignupSchema = Joi.object().keys(
    {
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    address: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    }
)

const SignInSchema = Joi.object().keys(
    {
        email: Joi.string().email({ minDomainAtoms: 2 }).required(), 
        password: Joi.string().required()
    }
)

const  AuthValidation = {
    signUpValidation: async(req, res, next) => {
        const { firstName, lastName, email, address, password } = req.body;
        const result = Joi.validate({ firstName , lastName, email, address, password }, SignupSchema);
        if(result.error){
            return ErrorHandler.errorResponse(res, 400,result.error.details[0].message);
        } 
        let userExistsQuery = `SELECT * FROM Users where email = $1`;
        let userExists = await pool.query(userExistsQuery, [email]);
        if (userExists.rows.length > 0){
            return ErrorHandler.errorResponse(res, 409, 'This user is already registered. Try logging in instead');
        }
    
        next();
    },

    signInValidation: async(req,res, next)=>{
        const { email, password } = req.body;
        const result = Joi.validate({email, password}, SignInSchema);
        if(result.error){
           return ErrorHandler.errorResponse(res, 400, result.error.details[0].message);
        }    
        next();
    }
};

export default AuthValidation;