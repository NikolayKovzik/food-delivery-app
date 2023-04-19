import React, { useEffect, useState } from 'react'
import { ICardListProps } from './types'
import styles from './styles.module.scss'
import { Card } from '../Card'
import { CardType } from '../../types'
import axios from 'axios'

function CardList({ cardsData }: ICardListProps) {
  const [cards, setCards] = useState<CardType[]>([] as CardType[])

  useEffect(() => {
    try {
      ;(async () => {
        const { data } = await axios.get<CardType[]>('http://localhost:4001/food')
        setCards(data)
      })()
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <ul className={styles['card-list']}>
      {cards.map((item, index) => {
        return (
          <li key={index}>
            <Card card={item}></Card>
          </li>
        )
      })}
    </ul>
  )
}
export default CardList
