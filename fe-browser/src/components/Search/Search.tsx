import React from 'react'
import styles from './styles.module.scss'
function Search() {
  return (
    <div className={styles['search-wrapper']}>
      <input type='search' />
      <button>filter</button>
    </div>
  )
}

export default Search
