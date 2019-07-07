const pool = require('../database/config');

export default class Car{
    constructor(registrationPlate, model, manufacturer, state, price, owner){
        this.registrationPlate = registrationPlate
        this.model = model
        this.manufacturer = manufacturer
        this.state = state
        this.price = price
        this.owner = owner
    }

    async addCar(){
            const createCarQuery = `INSERT INTO Cars(registrationPlate, model, manufacturer, state, price, owner) VALUES($1,$2,$3,$4,$5,$6) returning *`;
            const createdCar = await pool.query(createCarQuery, [this.registrationPlate, this.model, this.manufacturer, this.state, this.price, this.owner]);
            return createdCar.rows[0];
        }

    static async getAllCars(){
        const allCarsQuery = `SELECT * FROM Cars`;
        const allCars = await pool.query(allCarsQuery);
        return allCars.rows;
    }

    static async getSingleCar(carId){
        const singleCarQuery = `SELECT * FROM Cars where id=$1`;
        const singleCar = await pool.query(singleCarQuery, [carId]);
        return singleCar.rows;
    }
}

