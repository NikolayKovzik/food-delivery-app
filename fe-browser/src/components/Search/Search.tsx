import React, { useState } from 'react'
import searchLogo from '../../assets/images/ic_search.svg'
import settingLogo from '../../assets/images/setting.svg'
import './styles.scss'
import Chips from '../Chips/Chips'

function Search() {
  const [isOpenFilters, setIsOpenFilters] = useState(false)
  const toggleOpenFilters = () => {
    setIsOpenFilters((prevState) => !prevState)
  }
  return (
    <>
      <div className='search__wrapper'>
        <div className='search__container'>
          <img className='search__logo' src={searchLogo} alt='' />
          <input type='search' />
        </div>
        <button className='filter-btn__container' onClick={toggleOpenFilters}>
          <img src={settingLogo} alt='' />
        </button>
      </div>
      {isOpenFilters && <Chips />}
    </>
  )
}

export default Search
