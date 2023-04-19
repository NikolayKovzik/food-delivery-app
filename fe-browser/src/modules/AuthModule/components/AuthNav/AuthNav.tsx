import React from 'react'
import mainLogo from '../../../../assets/images/shopping-bag.png'
import styles from './styles.module.scss'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../../../hooks/redux'

function AuthNav() {
  const { theme } = useAppSelector((state) => state.theme)
  return (
    <div className={`${styles.navigation} ${styles[`navigation--${theme}`]}`}>
      <img src={mainLogo} width={127} height={127} alt='SVG logo image' />
      <p className={styles.companyName}>Corner Food</p>
      <p>Delivery App</p>

      <nav>
        <ul>
          <li>
            <NavLink to='login'>Login</NavLink>
          </li>
          <li>
            <NavLink to='signup'>Signup</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AuthNav
