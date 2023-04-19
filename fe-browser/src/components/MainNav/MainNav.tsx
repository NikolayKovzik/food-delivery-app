import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

function MainNav() {
  return (
    <ul className={styles['main-nav']}>
      <li>
        <NavLink to='#'>Home</NavLink>
      </li>
      <li>
        <NavLink to='#'>Favorites</NavLink>
      </li>
      <li>
        <NavLink to='#'>Cart</NavLink>
      </li>
      <li>
        <NavLink to='#'>Notifications</NavLink>
      </li>
      <li>
        <NavLink to='#'>Profile</NavLink>
      </li>
    </ul>
  )
}

export default MainNav
