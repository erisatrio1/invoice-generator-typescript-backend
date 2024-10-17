import { env } from "../config/config";
import mongoose from 'mongoose';
import { logger } from '../helpers/logging'
import * as Minio from 'minio';


export const minioClient = new Minio.Client({
    endPoint: env.MINIO_ENDPOINT, 
    port: env.MINIO_PORT, 
    useSSL: false, 
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY
}); 


export const connection = async(bucketName: string) :Promise<void> => {
    try {     
        await mongoose.connect(env.MONGODB_PORT);
        logger.info(`Connect to MongoDB`);

        const bucketExist = await minioClient.bucketExists(bucketName);
        if (!bucketExist) {
            await minioClient.makeBucket(bucketName)
            logger.info(`Bucket '${bucketName}' created.`);
        } else {
            logger.info(`Bucket '${bucketName}' already exists.`);
        }
        

    } catch (error) {
        logger.error('Error Initializing DB', { error: error instanceof Error ? error.message : error});
    }
}