import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo left" style={{fontSize: '35px'}}>E-Commerce</Link>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/signup" style={{fontSize: '25px'}}>Sign up</Link></li>
                    <li><Link to="/signin" style={{fontSize: '25px'}}>Sign in</Link></li>
                    <li><Link to="/profile" style={{fontSize: '25px'}}>Profile</Link></li>
                    <li><Link to="/signout" style={{fontSize: '25px'}}>Sign out</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar