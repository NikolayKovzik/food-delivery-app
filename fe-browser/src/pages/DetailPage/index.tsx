import React from 'react'
import { useParams } from 'react-router-dom'
import styles from './styles.module.scss'
import { useAppSelector } from '../../hooks/redux'

function DetailPage() {
  const { productId } = useParams()
  const { theme } = useAppSelector((state) => state.theme)
  return (
    <div className={`${styles[`details--${theme}`]} ${styles['details']}`}>
      <div className={`${styles['details__wrapper--top']}`}>
        <img src='' alt='' />
      </div>
      <div className={`${styles['details__wrapper--bottom']}`}>
        <p>productId: {productId}</p>
        <p>short description</p>
        <p>
          <span>$</span> <span>9.05</span>
        </p>
        <p>
          <span>Rating</span> <span>4.8</span>
        </p>

        <p>
          <span>time</span> <span>25 min</span>
        </p>
        <div>
          <p>About</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus perspiciatis
            recusandae sed.
          </p>
        </div>
        <div className={`${styles['details__inner-wrapper--bottom']}`}>
          <div className={`${styles['goods-count__wrapper']}`}>
            <button
              className={`${styles['goods-count__controls--subtract']} ${styles['goods-count__controls']}`}
            >
              -
            </button>
            <span className={`${styles['goods-count__amount']}`}>0</span>
            <button
              className={`${styles['goods-count__controls--add']} ${styles['goods-count__controls']}`}
            >
              +
            </button>
          </div>

          <button className={`${styles['goods-count__add-to-cart']}`}>add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
