import 'dotenv/config';
import {z} from 'zod'

const envSchema = z.object({
    MONGODB_PORT: z.string().min(1),
    QUEUE: z.string().min(1),
    RABBIT_PORT: z.string().min(1), 
    MINIO_ENDPOINT: z.string().min(1),
    MINIO_PORT: z.coerce.number().min(1),
    MINIO_ACCESS_KEY: z.string().min(1),
    MINIO_SECRET_KEY: z.string().min(1),
    MINIO_BUCKET: z.string().min(1),
    PORT: z.coerce.number().min(1)
})

export const env = envSchema.parse(process.env)