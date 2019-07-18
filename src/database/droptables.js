import pool from './config';

const dropTables = () => {

const dropAll = `DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS orders cascade;
DROP TABLE IF EXISTS cars cascade`;

pool.query(dropAll)
.then(
    (res)=>{
        console.log('Tables successfully dropped')
    })
.catch((error) =>{
   console.log('An error occured while dropping tables')
});
};

export default dropTables;