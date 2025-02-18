import { Fragment } from 'react'
import Link from 'next/link'
import LoginForm from './LoginForm'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in to your account and manage your finances securely.',
}

export default async function Login() {
  return (
    <Fragment>
      <h2 className='text-xl mb-8'>Login</h2>
      <LoginForm />
      <div className='flex justify-center w-full gap-2'>
        <span className='text-grey-500'>Need to create an account?</span>
        <Link href='/register' className='font-bold underline'>
          Register
        </Link>
      </div>
    </Fragment>
  )
}
