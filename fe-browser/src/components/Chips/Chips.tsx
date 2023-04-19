import React from 'react'
import styles from './styles.module.scss'

function Chips() {
  const mockData = ['spicy', 'sour', 'sweet']

  return (
    <ul className={styles['chips']}>
      {mockData.map((item, index) => {
        return <li key={index}>{item}</li>
      })}
    </ul>
  )
}

export default Chips
