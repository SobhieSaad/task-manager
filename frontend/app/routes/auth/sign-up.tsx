import { useForm } from 'react-hook-form'
import z from "zod";
import { signUpSchema } from '~/lib/schema';
import {zodResolver} from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Link, useNavigate } from 'react-router';
import { useSignUpMutation } from '~/hooks/use-auth';
import { toast } from 'sonner';

export type SignUpFormData = z.infer<typeof signUpSchema>

function SignUp() {
    const navigate = useNavigate();
    const form = useForm<SignUpFormData>(
        {
            resolver: zodResolver(signUpSchema),
            defaultValues: {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    );

    const {mutate, isPending} = useSignUpMutation();

    const handleOnSubmit = (values: SignUpFormData) => {
      mutate(values, {
        onSuccess: () => {
          toast.success('Email Verification required', {
            description: 
                'Please check youe email for a verification link, please check your spam folder if you don\'t see it'
            
          });

          form.reset();
          navigate('/sign-in');
        },
        onError: (error: any) => {
          const errorMsg = error.response?.data?.message || 'An error occured';

          toast.error(errorMsg)
        }
      });
    };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4'>
        <Card className='max-w-md w-full shadow-xl'>
            <CardHeader className='text-center mb-5'>
                <CardTitle className='txt-2xl font-bold'>Create an account</CardTitle>
                <CardDescription className='tex-sm text-muted-foreground'>
                  Create an account to continue
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(handleOnSubmit)}
                    className='space-y-6'
                    >
                      <FormField
                            control={form.control}
                            name='name'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' placeholder='Enter your name' {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type='email' placeholder='email@example.com' {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='*****' {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Repeat your password</FormLabel>
                                    <FormControl>
                                        <Input type='confirmPassword' placeholder='*****' {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button
                            type='submit'
                            className='w-full bg-blue-500 text-white'
                            disabled={isPending}
                        >
                          {isPending? 'Signing up...' : 'Sign up'}
                          </Button>
                    </form>
                </Form>
                <CardFooter className='mt-6 flex justify-center text-center'>
                    <div className='flex items-center justify-center'>
                        <p className='text-sm text-muted-foreground'>
                            Already have an account? {" "}
                            <Link className='text-sm text-blue-600' to='/sign-in'>Sign in</Link>
                        </p>
                    </div>
                </CardFooter>
            </CardContent>
        </Card>
    </div>
  )
}

export default SignUp