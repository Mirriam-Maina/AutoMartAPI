const Joi = require('joi');

const AuthSchema = Joi.object().keys(
    {
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    address: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    }
)

export default class AuthValidation{
    static async signInValidation(req, res, next){
        const { firstName, lastName, email, address, password } = req.body;
        const result = Joi.validate({ firstName , lastName, email, address, password }, AuthSchema);
        if(result.error){
            return res.status(400).json({
                status: 400,
                error: result.error.details[0].message,
            })
        } 
        next();
    }
}