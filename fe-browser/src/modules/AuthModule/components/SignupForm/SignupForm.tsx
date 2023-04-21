import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signupFormValues } from './types'
import styles from './styles.module.scss'
import usePasswordVisibility from '../../../../hooks/usePasswordVisibility'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { themeActions } from '../../../../redux/slices/themeSlice'
import { useNavigate } from 'react-router-dom'
import RoutesList from '../../../../routes/routes'
import { authActions } from '../../slices/authSlice'

function SignupForm() {
  const { showPassword, eyeButtonElement } = usePasswordVisibility()

  const { register, handleSubmit, reset, setError, clearErrors } = useForm<signupFormValues>()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSave = (formValues: signupFormValues) => {
    if (formValues['confirm password'] !== formValues.password) {
      setError('password', new Error('passwords are not match'))
      console.error('passwords do not match')
      return
    }

    const { password, email, username } = formValues
    dispatch(authActions.signUp({ password, email, username }))
    navigate(RoutesList.DEFAULT, { replace: true })
    clearErrors()
    reset()
  }
  const { theme } = useAppSelector((state) => state.theme)

  return (
    <form onSubmit={handleSubmit(handleSave)} className={`auth__form auth__form--${theme}`}>
      <div className='form__group'>
        <label htmlFor='username'>Username</label>
        <input {...register('username')} type='text' id='username' />
      </div>
      <div className='form__group'>
        <label htmlFor='email'>Email Address</label>
        <input
          {...register('email')}
          type='email'
          id='email'
          placeholder='example@mail.com'
          required
        />
      </div>
      <div className='form__group form__group--eye'>
        <label htmlFor='password'>Password</label>
        <input
          {...register('password')}
          type={showPassword ? 'text' : 'password'}
          id='password'
          required
        />
        {eyeButtonElement}
      </div>
      <div className='form__group form__group--eye'>
        <label htmlFor='password'>Confirm Password</label>
        <input
          {...register('confirm password')}
          type={showPassword ? 'text' : 'password'}
          id='Confirm Password'
          required
        />
        {eyeButtonElement}
      </div>
      <button className='form__submit' type='submit'>
        Signup
      </button>
    </form>
  )
}

export default SignupForm
