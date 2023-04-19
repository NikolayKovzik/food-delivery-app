import React from 'react'
import { useForm } from 'react-hook-form'
import { loginFormValues } from './types'
import usePasswordVisibility from '../../../../hooks/usePasswordVisibility'
import { useAppSelector } from '../../../../hooks/redux'
import { useLocation, useNavigate } from 'react-router-dom'
import RoutesList from '../../../../routes/routes'

function LoginForm() {
  const { showPassword, eyeButtonElement } = usePasswordVisibility()
  const { register, handleSubmit, reset } = useForm<loginFormValues>()

  const navigate = useNavigate()
  const location = useLocation()

  const handleSave = (formValues: loginFormValues) => {
    console.log(formValues)
    const origin = location.state?.from?.pathname || RoutesList.DEFAULT
    navigate(origin, { replace: true })
    reset()
  }

  const { theme } = useAppSelector((state) => state.theme)
  return (
    <form onSubmit={handleSubmit(handleSave)} className={`auth__form auth__form--${theme}`}>
      <div className='form__group'>
        <label htmlFor='email'>Email Address</label>
        <input
          type='email'
          {...register('email')}
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
      <a className='forgot' href='#'>
        Forgot Password?
      </a>
      <button className='form__submit' type='submit'>
        Login
      </button>
    </form>
  )
}

export default LoginForm
