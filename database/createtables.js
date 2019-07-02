const pool = require('./config')
const createAll = `CREATE TABLE IF NOT EXISTS users(
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
  owner INT REFERENCES users(id) ON DELETE CASCADE,
  state VARCHAR(5) NOT NULL,
  status VARCHAR(20) NOT NULL,
  price INT NOT NULL,
  manufacturer VARCHAR(20) NOT NULL,
  model VARCHAR(20) NOT NULL,
  body_type VARCHAR(20) NOT NULL,
  created_on TIMESTAMP                    
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
pool.end();
})
.catch((err) => {
pool.end();
});
