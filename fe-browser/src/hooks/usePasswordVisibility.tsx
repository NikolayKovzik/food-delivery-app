import React, { useState } from 'react'
import eye from '../assets/images/eye-regular.svg'
import eyeSlash from '../assets/images/eye-slash-regular.svg'
function usePasswordVisibility() {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const eyeButtonElement = (
    <button
      type='button'
      onClick={togglePasswordVisibility}
      style={{ backgroundColor: 'transparent' }}
    >
      {showPassword ? (
        <img src={eyeSlash} width={24} height={23} style={{ transform: 'scale(1.1)' }} />
      ) : (
        <img src={eye} width={24} height={23} />
      )}
    </button>
  )

  return { showPassword, eyeButtonElement }
}

export default usePasswordVisibility
