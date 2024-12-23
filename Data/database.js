import "dotenv/config.js";
import pgk from 'pg';

const {Pool} = pgk;

/**
 * @type {Client}
 */

let pool;

function getPool() {
    if(!pool){
        pool = new Pool({
            user: process.env.PG_USER,      
            host: process.env.PG_HOST,        
            database: process.env.PG_DATABASE,    
            password: process.env.PG_PASSWORD,    
            port: process.env.PG_PORT,            
            max: 20,                  
            idleTimeoutMillis: 30000, 
            connectionTimeoutMillis: 2000, 
            keepAlive: true,
        });
    }
    return pool;
}

export default getPool;