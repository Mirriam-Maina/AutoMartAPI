import Car from '../../models/cars';
import checkAdmin from '../../helpers/checkAdmin';
import ErrorHandler from '../../helpers/errorHandler';


const CarController = {
    createCarAd: async(req,res) => {
    const { registrationPlate, model, manufacturer, price, state } = req.body;
    const newCarAd = new Car(registrationPlate, model, manufacturer, state, price, req.user);
    const createdAd = await newCarAd.addCar();
    ErrorHandler.successResponse(res, 201, 'Car successfully created', createdAd);
    },

    getAllCars: async(req, res) => {
        const allCars = await Car.getAllCars();
        const isAdmin = await checkAdmin(req.user);
        if(isAdmin){
            return ErrorHandler.successResponse(res, 200, 'Cars retrieved successfully', availableCars);
        }
        else{
            const availableCars = allCars.filter(car =>  car.status === 'available');
            if(availableCars.length == 0){
               return ErrorHandler.errorResponse(res, 404, 'No available cars at the moment');
            }
            return ErrorHandler.successResponse(res, 200, 'Cars retrieved successfully', availableCars);
        }
    },

    getSingleCar: async(req, res) => {
        const { params: { id } } = req;
        const isAdmin = await checkAdmin(req.user);
        const singleCar = await Car.getSingleCar(id);
        if(!isAdmin && singleCar[0].status == 'sold'){
            return ErrorHandler.errorResponse(res, 401, 'You are not authorized to view this car');
        }
        return ErrorHandler.successResponse(res, 200, 'Car retrieved successfully', singleCar);
    },

    deleteCar: async(req, res) => {
        const { params: { id } } = req;
        const deletedCar = await Car.deleteCar(id);
        return ErrorHandler.errorResponse(res, 200, 'Car deleted successfully');
    },

   updateCarStatus: async(req, res) => {
        const { params: { id }, body: { status} } = req;
        const updatedStatus = await Car.updateCarStatus(id, status);
        return ErrorHandler.successResponse(res, 200, 'Car status successfully updated', updatedStatus);
    
    }, 

   updateCarPrice: async(req, res) => {
        const { body: { newPriceOffered }, params: { id }} = req;
        const updatedPrice = await Car.updateCarPrice(id, newPriceOffered);
        return ErrorHandler.successResponse(res, 200,  'Car price successfully updated', updatedPrice);
    }
    
};

export default CarController;