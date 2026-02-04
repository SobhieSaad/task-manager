import {z} from 'zod'

const registerSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be 8 characters').nonempty('Password is required'),
});

const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be 8 characters').nonempty('Password is required'),
});

export { registerSchema, loginSchema }