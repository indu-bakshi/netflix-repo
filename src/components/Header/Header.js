import React from 'react'
import logo from './netflix-logo.png'
import './Header.css'

const Header = () => {
    return (
        <div className="logo-header">
            <img onClick={()=>window.scroll(0,0)} src={logo} alt="NETFLIX" id="logo"/>
        </div>
    )
}

export default Header
