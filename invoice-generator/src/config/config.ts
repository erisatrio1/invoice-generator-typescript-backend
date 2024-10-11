import 'dotenv/config';
import {z} from 'zod'

const envSchema = z.object({
    MONGODB_PORT: z.string().min(1),
    QUEUE: z.string().min(1),
    RABBIT_PORT: z.string().min(1), 
    PG_HOST: z.string().min(1), 
    PG_USER: z.string().min(1), 
    PG_PASSWORD: z.string().min(1), 
    PG_DATABASE: z.string().min(1), 
    PG_PORT: z.coerce.number().min(1), 
    PORT: z.coerce.number().min(1)
})

export const env = envSchema.parse(process.env)