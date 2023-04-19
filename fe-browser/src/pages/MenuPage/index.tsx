import React from 'react'
import { CardList } from '../../components/CardList'
import { mockCards } from '../../mock'

function MenuPage() {
  return <CardList cardsData={mockCards} />
}

export default MenuPage
