'use client'

import { HidePasswordIcon, ShowPasswordIcon } from '@/components/icons'
import { Input, Label } from '@/components/ui'

import type { LoginValidation } from '@/lib/validations'
import { SubmitButton } from '@/components'
import { loginAction } from '@/actions'
import { loginValidation } from '@/lib/validations'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValidation>({
    resolver: zodResolver(loginValidation),
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: LoginValidation) => {
    const result = await loginAction(values)

    if (result?.error) {
      if (result.error.toLowerCase().includes('email')) {
        setError('email', { type: 'server', message: result.error })
      } else if (result.error.toLowerCase().includes('password')) {
        setError('password', { type: 'server', message: result.error })
      } else {
        setError('root', { type: 'server', message: result.error })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <div>
        <div className='label'>
          <Label htmlFor='email' className={errors.email ? 'label-error' : ''}>
            Email
          </Label>
          {errors.email && <p className='error-text'>{errors.email.message}</p>}
        </div>
        <Input
          type='email'
          id='email'
          {...register('email')}
          className={`input ${errors.email ? 'input-error' : ''}`}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
      </div>

      <div>
        <div className='label'>
          <Label
            htmlFor='password'
            className={errors.password ? 'label-error' : ''}
          >
            Password
          </Label>
          {errors.password && (
            <p className='error-text'>{errors.password.message}</p>
          )}
        </div>
        <div className='relative'>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            id='password'
            {...register('password')}
            className={`input ${errors.password ? 'input-error' : ''}`}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          <button
            type='button'
            onClick={() => setPasswordVisible((prev) => !prev)}
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            className='absolute right-3 top-1/2 transform -translate-y-1/2'
          >
            {passwordVisible ? <HidePasswordIcon /> : <ShowPasswordIcon />}
          </button>
        </div>
      </div>

      {errors.root && (
        <div className='text-red-500 bg-red-100 p-2 rounded-md text-sm'>
          {errors.root.message}
        </div>
      )}

      <SubmitButton
        loading={isSubmitting}
        pendingText='Logging in...'
        className='w-full h-12'
      >
        Login
      </SubmitButton>
    </form>
  )
}

export default LoginForm
