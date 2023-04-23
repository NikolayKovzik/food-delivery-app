import React from 'react'
import { ReactSVG } from 'react-svg'
import { NavLink } from 'react-router-dom'

import './styles.scss'

import homeIcon from '../../assets/images/material_icons/home.svg'
import favoriteIcon from '../../assets/images/material_icons/favorite.svg'
import notificationIcon from '../../assets/images/material_icons/notifications.svg'
import personIcon from '../../assets/images/material_icons/person.svg'
import shoppingIcon from '../../assets/images/material_icons/shopping.svg'

function MainNav() {
  return (
    <div className='footer__wrapper'>
      <ul className='footer__container'>
        <li>
          <NavLink to='/'>
            <ReactSVG src={homeIcon} />
          </NavLink>
        </li>
        <li>
          <NavLink to='favorite'>
            <ReactSVG src={favoriteIcon} />
          </NavLink>
        </li>
        <li className='center'>
          <div className='center-icon-container'>
            <NavLink to='order'>
              <ReactSVG src={shoppingIcon} />
            </NavLink>
          </div>
        </li>
        <li>
          <NavLink to='notification'>
            <ReactSVG src={notificationIcon} />
          </NavLink>
        </li>
        <li>
          <NavLink to='profile'>
            <ReactSVG src={personIcon} />
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default MainNav
