import React from 'react'
import styles from './styles.module.scss'
function MainHeader() {
  return (
    <div className={styles['main-header']}>
      <p>Let&#39;s eat Quality food</p>
      <img className={styles['user-avatar']} src='#' alt='user avatar' />
    </div>
  )
}

export default MainHeader
