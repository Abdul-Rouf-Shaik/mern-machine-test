import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import NavMobile from './NavMobile'
import NavDesktop from './NavDesktop'

const Header = () => {
  return (
    <div className=" border-neutral-700">
      <nav className="container flex items-center justify-between py-1 lg:py-5">
        <span className="text-lg sm:text-4xl">DealsDray</span>
        <NavMobile />
        <NavDesktop />
      </nav>
    </div>
  )
}

export default Header