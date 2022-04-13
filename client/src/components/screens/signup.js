import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import validator from 'validator'

const Signup = () => {  

    const navigate = useNavigate("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    //pull data from the database using the fetch API 
    const PostData = () => {

        if (!validator.isEmail(email)) {
            M.toast({html: "Invalid email!", classes: '#c62828 red darken-3'})
            return
        }

        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
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
                M.toast({html: data.message, classes: '#43a047 green darken-1'})
                navigate('/signin')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Sign up</h2>
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br/>
                <br/>
                <button className="btn waves-effect waves-light" style={{backgroundColor: '#ee6e73'}} onClick={() => PostData()}>Sign up</button>
                <h5>
                    <Link to="/signin" style={{color: '#6e79ee'}}>Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup