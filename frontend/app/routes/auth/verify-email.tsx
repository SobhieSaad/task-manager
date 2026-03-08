import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import {CheckCircle, Loader, XCircle} from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useVerifyEmailmutation } from '~/hooks/use-auth';
import { toast } from 'sonner';

function VerifyEmail() {
  const [searchParams] = useSearchParams()

  const [isSuccess, setisSuccess] = useState(false)

  const {mutate, isPending} = useVerifyEmailmutation()

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setisSuccess(false)
    } else {
      mutate({token}, {
        onSuccess: () => setisSuccess(true),
        onError: (error) => {
          setisSuccess(false)
          console.log(error)
          toast.error(error.message)
        }
      })
    }
  }, [searchParams])
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold'>Verify Email</h1>
      <p className='text-sm text-gray-500'>Verifiying you email...</p>
      <Card className='w-full max-w-md'>
        <CardHeader>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center justify-center py-6'>
            {isPending ? 
            <>
              <Loader className='w-10 h-10 text-gray-500 animate-spin mt-6'></Loader>
              <h3 className='text-lg font-semibold'>Verifying email</h3>
              <p className='text-sm text-gray-500'>
                Please wait while we verify your email.
              </p>
            </> 
            : isSuccess ? (
              <>
                <CheckCircle className='w-10 h-10 text-green-500'></CheckCircle>
                <h3 className='text-lg font-semibold'>Email Verified</h3>
                <p className='text-sm text-gray-500'>Your email has been verified successfully</p>
                <Link to='/sign-in' className='text-sm text-blue-500'>
                  <Button variant='outline'>Back to sign in</Button>
                </Link>
              </>
            ) : (
              <>
                <XCircle className='w-10 h-10 text-red-500'></XCircle>
                <h3 className='text-lg font-semibold'>Email Verified Failed</h3>
                <p className='text-sm text-gray-500'>
                  Your email has not been verified successfully, please try again
                </p>
                <Link to='/sign-in' className='text-sm text-blue-500 mt-6'>
                  <Button variant='outline'>Back to sign in</Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmail