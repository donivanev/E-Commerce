import React from 'react'
import { Link } from 'react-router-dom'

const Signin = () => {
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Sign in</h2>
                <input type="text" placeholder="email" /*value={email} onChange={(e) => setEmail(e.target.value)}*/ />
                <input type="text" placeholder="password" /*value={password} onChange={(e) => setPassword(e.target.value)}*/ />
                <br/>
                <br/>
                <button className="btn waves-effect waves-light" style={{backgroundColor: '#ee6e73'}} /*onClick={() => PostData()}*/>Sign in</button>
                <h5>
                    <Link to="/signup" style={{color: '#6e79ee'}}>Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin