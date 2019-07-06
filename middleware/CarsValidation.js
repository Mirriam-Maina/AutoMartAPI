const Joi = require('joi');
const pool = require('../database/config');


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
            return res.status(400).json({
                status: 400,
                error: result.error.details[0].message,
            })
        } 
        const carExistsQuery = `SELECT * FROM Cars where registrationPlate = $1`;
        const carExists = await pool.query(carExistsQuery, [registrationPlate]);
        if(carExists.rows.length > 0){
            return res.status(409).json({
                status: 409,
                error: 'A car with that registration plate already exists',
            })
        }
        next();

    }
}