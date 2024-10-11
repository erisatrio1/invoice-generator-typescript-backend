import { env } from "../config/config";
import mongoose from 'mongoose';
import { logger } from '../helpers/logging'
import pg from 'pg'

const { Pool } = pg
export const pool = new Pool({
    user: env.PG_USER,         
    host: env.PG_HOST,             
    database: env.PG_DATABASE,     
    password: env.PG_PASSWORD,     
    port: env.PG_PORT,                    
});

export const connection = async() :Promise<void> => {
    try {     
        await mongoose.connect(env.MONGODB_PORT);
        logger.info(`Connect to MongoDB`);
        
        await pool.connect();
        logger.info(`Connect to PostgreSql`);

    } catch (error) {
        logger.error('Error Initializing DB', { error: error instanceof Error ? error.message : error});
    }
}