import express from 'express';
import middleware from '../../middleware';
import CarController from './CarController';

const { Authenticate, CarsValidation } = middleware;
const CarControllerRouter = express.Router();

CarControllerRouter.post(
    '/car',
    Authenticate.checkToken,
    CarsValidation.createCar,
    CarController.createCarAd
)

CarControllerRouter.get(
    '/car',
    CarsValidation.getCarAuth,
    CarController.getAllCars
)

CarControllerRouter.get(
    '/car/:id',
    CarsValidation.getCarAuth,
    CarsValidation.getSingleCar,
    CarController.getSingleCar
)

export default CarControllerRouter;