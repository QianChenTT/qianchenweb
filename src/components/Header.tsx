import React from 'react'
import '../stylesheets/Header.css'

const Header = () => {
  return (
    <>
      <div className="Header">
        <img src="/assets/brand-logo.png" alt="" className="header-brand-logo"/>
        <div className="header-text">Meme Generator</div>
      </div>
    </>
  )
}

export default Header;