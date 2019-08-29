import pool from '../database/config';

const createTables = () => {

  const createAll = `
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,                        
    password VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false
  );
  
CREATE TABLE IF NOT EXISTS cars(
  id SERIAL PRIMARY KEY,
  registrationPlate VARCHAR(30) NOT NULL,
  model VARCHAR(20) NOT NULL,
  manufacturer VARCHAR(20) NOT NULL,
  state VARCHAR(5) NOT NULL,
  price INT NOT NULL,
  oldpriceoffered INT DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'available',
  owner VARCHAR REFERENCES users(email) ON DELETE CASCADE,
  createdOn TIMESTAMPTZ NOT NULL DEFAULT NOW()                   
);

CREATE TABLE IF NOT EXISTS orders(
  id SERIAL PRIMARY KEY,
  buyer INT REFERENCES users(id) ON DELETE CASCADE,
  car_id INT NOT NULL,
  amount INT NOT NULL,
  status VARCHAR(20) NOT NULL
)`;


pool.query(createAll)
.then((res) => {
console.log('Tables successfully created');
})
.catch((err) => {
console.log('An error occured while creating tables', err);
});

};

export default createTables;
