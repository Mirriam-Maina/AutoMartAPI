const Joi = require('joi');
const pool = require('../database/config');
import Authenticate from '../middleware/Authenticate';
import ErrorHandler from '../helpers/errorHandler';


const CarAdSchema = Joi.object().keys({
    registrationPlate: Joi.string().alphanum().min(3).max(30).required(),
    model: Joi.string().alphanum().min(3).max(30).required(),
    manufacturer: Joi.string().alphanum().min(3).max(30).required(),
    state: Joi.string().alphanum().min(3).max(30).required(),
    price: Joi.number().integer().required()
})

export default class CarAdValidation{

    static async createCar(req, res, next){
        const { registrationPlate, model, manufacturer, state, price} = req.body;
        const result = Joi.validate({registrationPlate, model, manufacturer, state, price}, CarAdSchema);
        if(result.error){
            ErrorHandler.errorResponse(res, 400, result.error.details[0].message)
        } 
        const carExistsQuery = `SELECT * FROM Cars where registrationPlate = $1`;
        const carExists = await pool.query(carExistsQuery, [registrationPlate]);
        if(carExists.rows.length > 0){
            ErrorHandler.errorResponse(res, 409, 'A car with that registration plate already exists');
        }
        next();
    }; 

    static async getAllCars (req, res, next){
        const token = req.headers.authorization
        || req.body.token
        || req.query.token;

        if(token){
            await Authenticate.decodeToken(req, res, token)
        }
        next();
    };
}