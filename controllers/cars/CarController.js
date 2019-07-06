import Car from '../../models/cars';

export default class CarController{
    static async createCarAd(req,res){
    const { registrationPlate, model, manufacturer, price, state } = req.body;
    const newCarAd = new Car(registrationPlate, model, manufacturer, state, price, req.user);
    const createdAd = await newCarAd.addCar();
    return res.status(201).json({
        status: 201,
        message: 'Car successfully created',
        data: createdAd
    })
    }
}