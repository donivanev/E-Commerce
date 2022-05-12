import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import validator from 'validator'

const Signup = () => {

    const navigate = useNavigate("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        if (url) {
            uploadFields()
        }
    }, [url])

    const uploadPicture = () => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'ecommerce')
        data.append('cloud_name', 'projectpics')

        fetch('https://api.cloudinary.com/v1_1/projectpics/image/upload', {
            method: 'post',
            body: data
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                M.toast({ html: 'Please upload an image!', classes: "#c62828 red darken-3" })
            }
            else {
                setUrl(data.url)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const uploadFields = () => {

        if (!validator.isEmail(email)) {
            M.toast({ html: "Invalid email!", classes: '#c62828 red darken-3' })
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
                email,
                avatar: url
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: '#c62828 red darken-3' })
                }
                else {
                    M.toast({ html: data.message, classes: '#43a047 green darken-1' })
                    navigate('/signin')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    //pull data from the database using the fetch API 
    const PostData = () => {

        if (image) {
            uploadPicture()
        }
        else {
            uploadFields()
        }
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Sign up</h2>
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <br />
                <div className="file-field input-field">
                    <div className="btn" style={{ backgroundColor: '#ee6e73' }}>
                        <span>Upload Picture</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light" style={{ backgroundColor: '#ee6e73' }} onClick={() => PostData()}>Sign up</button>
                <h5>
                    <Link to="/signin" style={{ color: '#6e79ee' }}>Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup