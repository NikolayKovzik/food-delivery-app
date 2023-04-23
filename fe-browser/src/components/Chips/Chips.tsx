import React, { useEffect, useState } from 'react'
import './styles.scss'

function Chips() {
  const mockData = [
    //  todo get this from server
    'spicy',
    'sour',
    'sweet',
    'some1',
    'some2',
    'some3',
    'some4',
    'some5',
    'some6',
    'some7',
  ]
  const [selectedChips, setSelectedChips] = useState<null | number>(null)

  useEffect(() => {
    // getChips
  }, [])

  const updateSelectedChips = (index: number) => {
    if (selectedChips !== null) {
      setSelectedChips(null)
      return
    } else setSelectedChips(index)
    filterItems()
  }

  const isSelected = (index: number) => {
    return selectedChips === index ? ' selected' : ''
  }

  const filterItems = () => {
    // todo some dispach
  }

  return (
    <ul className='chips__container'>
      {mockData.map((item, index) => {
        return (
          <li
            className={'chips__item' + isSelected(index)}
            key={index}
            onClick={() => updateSelectedChips(index)}
          >
            {item}
          </li>
        )
      })}
    </ul>
  )
}

export default Chips
