import express from 'express';
import middleware from '../../middleware';
import CarController from './CarController';

const { Authenticate, CarsValidation } = middleware;
const CarControllerRouter = express.Router();

CarControllerRouter.post(
    '/car',
    Authenticate.checkToken,
    CarsValidation.createCarValidation,
    CarController.createCarAd
)

CarControllerRouter.get(
    '/car',
    CarsValidation.getCarAuthValidation,
    CarController.getAllCars
)

CarControllerRouter.get(
    '/car/:id',
    CarsValidation.getCarAuthValidation,
    CarsValidation.getSingleCarValidation,
    CarController.getSingleCar
)

CarControllerRouter.patch(
    '/car/:id/status',
    Authenticate.checkToken,
    CarsValidation.getSingleCarValidation,
    CarsValidation.carOwnerValidation,
    CarController.updateCarStatus
)

CarControllerRouter.patch(
    '/car/:id/price',
    Authenticate.checkToken,
    CarsValidation.getSingleCarValidation,
    CarsValidation.carOwnerValidation,
    CarController.updateCarPrice
)

CarControllerRouter.delete(
    '/car/:id',
    Authenticate.checkToken,
    CarsValidation.getSingleCarValidation,
    CarController.deleteCar

)

export default CarControllerRouter;