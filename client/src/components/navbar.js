import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo left">E-Commerce</Link>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/signup">Sign up</Link></li>
                    <li><Link to="/signin">Sign in</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/signout">Sign out</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar