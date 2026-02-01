import { useForm } from 'react-hook-form'
import z from "zod";
import { signInSchema } from '~/lib/schema';
import {zodResolver} from '@hookform/resolvers/zod'

type SigninFormData = z.infer<typeof signInSchema>

function SignIn() {
    const form = useForm<SigninFormData>(
        {
            resolver: zodResolver(signInSchema),
            defaultValues: {
                email: '',
                password: ''
            }
        }
    )
  return (
    <div>SignIn</div>
  )
}

export default SignIn