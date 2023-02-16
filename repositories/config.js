const Pool = require("pg").Pool;
const util = require('util');

function createPool() {
    return new Pool({
        user: "me",
        host: "localhost",
        database: "api",
        password: "password",
        port: 5432,
    });
}



async function query(query, params) {
    const pool = createPool();
    
    return new Promise((resolve, reject) => {
        pool.query(query, params, (err, results) => {
            if(err){
                reject(err);
            }
                        
            resolve(results.rows);
        });
    });
    
}

module.exports = {
    query
};