import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Sign up</h2>
                <input type="text" placeholder="email" /*value={name} onChange={(e) => setName(e.target.value)}*/ />
                <input type="text" placeholder="name" /*value={email} onChange={(e) => setEmail(e.target.value)}*/ />
                <input type="text" placeholder="password" /*value={password} onChange={(e) => setPassword(e.target.value)}*/ />
                <button className="btn waves-effect waves-light" style={{backgroundColor: '#ee6e73'}} /*onClick={() => PostData()}*/>Sign up</button>
                <h5>
                    <Link to="/signin" style={{color: '#6e79ee'}}>Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup