import { z, ZodType } from "zod";

export class AllValidation {

    static readonly ID: ZodType = z.object({
        name: z.string().min(1).max(100),
        email: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        confPassword: z.string().min(1).max(100)
    })


}