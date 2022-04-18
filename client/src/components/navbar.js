import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'

const NavBar = () => {

    const {state, dispatch} = useContext(UserContext)

    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/profile" style={{fontSize: '25px'}}>Profile</Link></li>,
                <li><Link to="/createproduct" style={{fontSize: '25px'}}>Create</Link></li>,
                <li><Link to="/signin" style={{fontSize: '25px'}} onClick={() => {localStorage.clear()
                    dispatch({type: 'CLEAR'});}}>Sign out</Link></li>
            ]
        }
        else {
            return [
                <li><Link to="/signup" style={{fontSize: '25px'}}>Sign up</Link></li>,
                <li><Link to="/signin" style={{fontSize: '25px'}}>Sign in</Link></li>
            ]
        }
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to={state ? '/' : '/signin'} className="brand-logo left" style={{fontSize: '35px'}}>Home</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar