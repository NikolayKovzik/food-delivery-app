import React, { useState } from 'react'
import fav from '../assets/images/ic_favorite_selected.svg'
import notfav from '../assets/images/ic_favorite_unselected.svg'
function useFavorite() {
  const [isFavorite, setFavorite] = useState(false)
  const toggle = () => {
    setFavorite(!isFavorite)
  }

  const addFavoriteElement = (
    <span onClick={toggle}>{isFavorite ? <img src={fav} /> : <img src={notfav} />}</span>
  )

  return { isFavorite, addFavoriteElement }
}

export default useFavorite
