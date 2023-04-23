import React from 'react'
import profileLogo from '../../assets/images/beaty_man.png'
import './styles.scss'

function MainHeader() {
  return (
    <div className='main-header'>
      <h1>Let&#39;s eat Quality food</h1>
      <img className='main__icon' src={profileLogo} alt='user avatar' />
    </div>
  )
}

export default MainHeader
