import React, { useEffect, useState } from 'react'
import { ICardListProps } from './types'
import styles from './styles.module.scss'
import { Card } from '../Card'
import { CardType } from '../../types'
import axios from 'axios'
import { $authApi } from '../../http/api'

function CardList({ cardsData }: ICardListProps) {
  const [cards, setCards] = useState<CardType[]>([] as CardType[])

  useEffect(() => {
    try {
      ;(async () => {
        const { data } = await $authApi.get<CardType[]>('food')
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
