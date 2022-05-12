import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'

const NavBar = () => {

    const {state, dispatch} = useContext(UserContext)

    const renderList = () => {
        if (state) {
            return [
                <li key='1'><Link to={'/profile/' + state._id} style={{fontSize: '25px'}}>Profile</Link></li>,
                <li key='2'><Link to="/createproduct" style={{fontSize: '25px'}}>Create</Link></li>,
                <li key='3'><Link to="/signin" style={{fontSize: '25px'}} onClick={() => {
                    localStorage.clear()
                    dispatch({type: 'CLEAR'})
                    M.toast({ html: 'Successfully signed out.', classes: "#43a047 green darken-1" })
                }}>Sign out</Link></li>
            ]
        }
        else {
            return [
                <li key='4'><Link to="/signup" style={{fontSize: '25px'}}>Sign up</Link></li>,
                <li key='5'><Link to="/signin" style={{fontSize: '25px'}}>Sign in</Link></li>
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