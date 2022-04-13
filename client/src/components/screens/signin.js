import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import validator from 'validator'

const Signin = () => {

    const navigate = useNavigate("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const PostData = () => {

        if (!validator.isEmail(email)) {
            M.toast({html: 'Invalid email!', classes: '#c62828 red darken-3'})
            return
        }

        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                email
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                M.toast({html: data.error, classes: '#c62828 red darken-3'})
            }
            else {
                M.toast({html: 'Welcome, ' + data + '!', classes: '#43a047 green darken-1'})
                navigate('/')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Sign in</h2>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br/>
                <br/>
                <button className="btn waves-effect waves-light" style={{backgroundColor: '#ee6e73'}} onClick={() => PostData()}>Sign in</button>
                <h5>
                    <Link to="/signup" style={{color: '#6e79ee'}}>Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin