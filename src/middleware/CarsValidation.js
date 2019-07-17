const Joi = require('joi');
const pool = require('../database/config');
import Authenticate from './Authenticate';
import ErrorHandler from '../helpers/errorHandler';


const CarAdSchema = Joi.object().keys({
    registrationPlate: Joi.string().alphanum().min(3).max(30).required(),
    model: Joi.string().alphanum().min(3).max(30).required(),
    manufacturer: Joi.string().alphanum().min(3).max(30).required(),
    state: Joi.string().alphanum().min(3).max(30).required(),
    price: Joi.number().integer().required()
});

const statusSchema = Joi.object().keys({
    status: Joi.string().alphanum().min(3).max(30).required()
});

const priceSchema = Joi.object().keys({
   newPriceOffered: Joi.number().integer().required()
});

const CarAdValidation = {

   createCarValidation: async(req, res, next) => {
        const { registrationPlate, model, manufacturer, state, price} = req.body;
        const result = Joi.validate({registrationPlate, model, manufacturer, state, price}, CarAdSchema);
        if(result.error){
            return ErrorHandler.errorResponse(res, 400, result.error.details[0].message)
        } 
        const carExistsQuery = `SELECT * FROM Cars where registrationPlate = $1`;
        const carExists = await pool.query(carExistsQuery, [registrationPlate]);
        if(carExists.rows.length > 0){
           return ErrorHandler.errorResponse(res, 409, 'A car with that registration plate already exists');
        }
        next();
    },

   getCarAuthValidation: async(req, res, next)=> {
        const token = req.headers.authorization
        || req.body.token
        || req.query.token;

        if(token){
            await Authenticate.decodeToken(req, res, token)
        }
        next();
    },

   getSingleCarValidation: async(req, res, next) => {
        const carId = req.params.id;
        if(isNaN(carId)){
           return ErrorHandler.errorResponse(res, 400, 'Type of ID must be an integer');
        }
        else{   
            const carExistsQuery = `SELECT * FROM Cars where id = $1`;
            const carExists = await pool.query(carExistsQuery, [carId]);
            carExists.rows.length == 0 ? ErrorHandler.errorResponse(res, 404, 'Car with that id was not found') : null;
        }
        next();
    },

carOwnerValidation: async(req, res, next) => {
        let result;
        if(req.url.includes('status')) {
            const  { status } = req.body
            result = Joi.validate({status}, statusSchema);
        }
        else if(req.url.includes('price')){
            const { newPriceOffered } = req.body
            result = Joi.validate({ newPriceOffered }, priceSchema);
        }
       if(result && result.error){
           return ErrorHandler.errorResponse(res, 400, result.error.details[0].message)
       }
        const carId = req.params.id;
        const user = req.user;
        const carOwnerQuery = `SELECT * FROM Cars WHERE id = $1 and owner = $2`;
        const carOwner = await pool.query(carOwnerQuery, [carId, user]);
        if(carOwner.rows.length == 0){
            return ErrorHandler.errorResponse(res, 401, 'You are not the owner of this car');
        }
        next();
    },

};

export default CarAdValidation;