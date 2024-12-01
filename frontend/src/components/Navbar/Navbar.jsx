import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
const Navbar = () => {

    const [menu,setMenu] = useState("Category");

  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className="logo" />
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
            <a href='#explore-category' onClick={()=>setMenu("Category")} className={menu==="Category"?"active":""}>Category</a>
            <a href='#app-download' onClick={()=>setMenu("Mobile App")} className={menu==="Mobile App"?"active":""}>Mobile App</a>
            <a href='#footer' onClick={()=>setMenu("Contact Us")} className={menu==="Contact Us"?"active":""}>Contact Us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="" />
                <div className="dot"></div>
            </div>
            <button>sign in</button>
        </div>
    </div>
  )
}

export default Navbar
