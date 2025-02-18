'use client'

import { HidePasswordIcon, ShowPasswordIcon } from '@/components/icons'
import { Input, Label } from '@/components/ui'

import type { RegisterValidation } from '@/lib/validations'
import { SubmitButton } from '@/components'
import { registerAction } from '@/actions'
import { registerValidation } from '@/lib/validations'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

function RegisterForm() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValidation>({
    resolver: zodResolver(registerValidation),
    mode: 'onBlur',
    defaultValues: { name: '', email: '', password: '' },
  })

  const onSubmit = async (values: RegisterValidation) => {
    const result = await registerAction(values)

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
          <Label htmlFor='name' className={errors.name ? 'label-error' : ''}>
            Name
          </Label>
          {errors.name && <p className='error-text'>{errors.name.message}</p>}
        </div>
        <Input
          type='text'
          id='name'
          {...register('name')}
          className={`input ${errors.name ? 'input-error' : ''}`}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
      </div>
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
        pendingText='Signing up...'
        className='w-full h-12'
      >
        Register
      </SubmitButton>
    </form>
  )
}

export default RegisterForm
