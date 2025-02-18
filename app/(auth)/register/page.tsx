import { Fragment } from 'react'
import Link from 'next/link'
import { Metadata } from 'next/types'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = {
  title: 'Register',
  description:
    'Create an account to start tracking and managing your finances.',
}

export default async function Register() {
  return (
    <Fragment>
      <h2 className='text-xl mb-8'>Register</h2>
      <RegisterForm />
      <div className='flex justify-center w-full gap-2'>
        <span className='text-grey-500'>Already have an account? </span>
        <Link href='/login' className='font-bold underline'>
          Login
        </Link>
      </div>
    </Fragment>
  )
}
