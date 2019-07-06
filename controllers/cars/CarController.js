import Car from '../../models/cars';
import checkAdmin from '../../helpers/checkAdmin';
import ErrorHandler from '../../helpers/errorHandler';

export default class CarController{
    static async createCarAd(req,res){
    const { registrationPlate, model, manufacturer, price, state } = req.body;
    const newCarAd = new Car(registrationPlate, model, manufacturer, state, price, req.user);
    const createdAd = await newCarAd.addCar();
    ErrorHandler.successResponse(res, 201, 'Car successfully created', createdAd);
    }

    static async getAllCars(req, res){
        const allCars = await Car.getAllCars();
        const isAdmin = await checkAdmin(req.user);
        if(isAdmin){
            ErrorHandler.successResponse(res, 200, 'Cars retrieved successfully', availableCars);
        }
        else{
            const availableCars = allCars.filter(car =>  car.status === 'available');
            if(availableCars.lenth == 0){
               ErrorHandler.errorResponse(res, 404, 'No available cars at the moment');
            }
            ErrorHandler.successResponse(res, 200, 'Cars retrieved successfully', availableCars);
        }

    }
}