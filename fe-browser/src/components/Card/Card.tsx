import React from 'react'
import { ICardProps } from './types'
import styles from './styles.module.scss'

import useFavorite from '../../hooks/useFavorite'
import { useAppSelector } from '../../hooks/redux'
function Card({ card }: ICardProps) {
  const { addFavoriteElement } = useFavorite()
  const { theme } = useAppSelector((state) => state.theme)
  return (
    <div className={`${styles.card} ${styles[`card--${theme}`]}`}>
      <p className={styles.name}>{card.name}</p>
      <div className={styles['image-wrapper']}>
        <img className={styles['main-img']} src={card.imgSrc} alt={card.name} />
        <button className={styles['add-favorite']}>{addFavoriteElement}</button>
      </div>
      <p className={styles.description}>{card.description}</p>
      <p className={styles['price-wrapper']}>
        <span className={styles.moneySign}>{card.moneySign}</span>
        <span className={styles.price}>{card.price}</span>
      </p>
      <button className={styles['add-cart']}>Add to Cart</button>
    </div>
  )
}

export default Card
