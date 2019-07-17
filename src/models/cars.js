import pool from '../database/config';

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

    static async updateCarStatus(carId, status){
        const updateCarStatusQuery = `UPDATE Cars SET status=$1 where id=$2  returning *`;
        const updateCarStatus = await pool.query(updateCarStatusQuery, [status, carId]);
        return updateCarStatus.rows;
    }

    static async updateCarPrice(carId, newPrice){
        const currentPriceQuery = `SELECT price from Cars where id = $1`;
        const currentPrice = await pool.query(currentPriceQuery, [carId]);
        const oldPriceOfferedQuery = `UPDATE Cars SET oldPriceOffered=$1 where id=$2 returning *`;
        const oldPriceOffered = await pool.query(oldPriceOfferedQuery, [currentPrice.rows[0].price, carId]);
        const updateCarPriceQuery = `UPDATE Cars SET price=$1 where id=$2 returning *`;
        const updateCarPrice = await pool.query(updateCarPriceQuery, [newPrice, carId]);
        return updateCarPrice.rows;
    }

    static async deleteCar(carId){
        const deleteCarQuery = `DELETE FROM Cars where id=$1`;
        const deleteCar = await pool.query(deleteCarQuery, [carId]);
        return deleteCar
    }
}

