import z from "zod";

export const signInSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().nonempty('Password is required')
});

export const signUpSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be 8 characters').nonempty('Password is required'),
    confirmPassword: z.string().min(8, 'Password must be 8 characters').nonempty('Password is required')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match'
})