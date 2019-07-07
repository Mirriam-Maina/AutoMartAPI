import Car from '../../models/cars';
import checkAdmin from '../../helpers/checkAdmin';
import ErrorHandler from '../../helpers/errorHandler';

export default class CarController{
    static async createCarAd(req,res){
    const { registrationPlate, model, manufacturer, price, state } = req.body;
    const newCarAd = new Car(registrationPlate, model, manufacturer, state, price, req.user);
    const createdAd = await newCarAd.addCar();
    return ErrorHandler.successResponse(res, 201, 'Car successfully created', createdAd);
    }

    static async getAllCars(req, res){
        const allCars = await Car.getAllCars();
        const isAdmin = await checkAdmin(req.user);
        if(isAdmin){
            return ErrorHandler.successResponse(res, 200, 'Cars retrieved successfully', availableCars);
        }
        else{
            const availableCars = allCars.filter(car =>  car.status === 'available');
            if(availableCars.lenth == 0){
               return ErrorHandler.errorResponse(res, 404, 'No available cars at the moment');
            }
            return ErrorHandler.successResponse(res, 200, 'Cars retrieved successfully', availableCars);
        }
    };

    static async getSingleCar(req, res){
        const carId = req.params.id;
        const isAdmin = await checkAdmin(req.user);
        const singleCar = await Car.getSingleCar(carId);
        if(!isAdmin && singleCar[0].status == 'sold'){
            return ErrorHandler.errorResponse(res, 401, 'You are not authorized to view this car');
        }
        return ErrorHandler.successResponse(res, 200, 'Car retrieved successfully', singleCar);
    };

    static async updateCarStatus(req, res){
        const carId = req.params.id;
        const { status } = req.body;
        const updatedStatus = await Car.updateCarStatus(carId, status);
        return ErrorHandler.successResponse(res, 200, 'Successfully updated the status', updatedStatus);
    }

    static async updateCarPrice(req, res){
        const cardId = req.params.id;
        const newprice = req.body.newPriceOffered;
        const updatedPrice = await Car.updateCarPrice(cardId, newprice);
        return ErrorHandler.successResponse(res, 200, 'Successfully updated the price', updatedPrice);
    }

    static async deleteCar(req, res){
        const carId= req.params.id;
        const isAdmin = await checkAdmin(req.user);
        if(isAdmin){
        const deleteCar = await Car.deleteCar(carId);
        return ErrorHandler.successResponse(res, 200, 'Car Deleted successfully');
        }
        else{
           return ErrorHandler.errorResponse(res, 403, 'Only admin can perform this action');
        }
        
    }
};