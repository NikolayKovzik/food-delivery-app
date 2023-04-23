import React from 'react'
import MainHeader from '../../components/MainHeader/MainHeader'
import Chips from '../../components/Chips/Chips'
import { Search } from '../../components/Search'
import { MainNav } from '../../components/MainNav'
import { Outlet } from 'react-router-dom'

function MenuLayout() {
  return (
    <div>
      <MainHeader />
      <Search />
      <Outlet />
      <MainNav />
    </div>
  )
}

export default MenuLayout
