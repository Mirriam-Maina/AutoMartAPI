const pool = require('./config');

const dropAll = `DROP TABLE IF EXISTS users cascade;
DROP TABLE IF EXISTS orders cascade;
DROP TABLE IF EXISTS cars cascade`;

pool.query(dropAll)
.then(
    (res)=>{
        pool.end();
    })
.catch((error) =>{
    pool.end();
});
