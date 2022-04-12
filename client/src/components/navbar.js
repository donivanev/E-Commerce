import React from 'react'

const NavBar = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="#" className="brand-logo left">Logo</a>
                <ul id="nav-mobile" className="right">
                    <li><a href="sass.html">Sign up</a></li>
                    <li><a href="badges.html">Sign in</a></li>
                    <li><a href="collapsible.html">Profile</a></li>
                    <li><a href="sass.html">Sign out</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar