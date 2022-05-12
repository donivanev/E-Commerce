import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import M from 'materialize-css'

const Profile = () => {

    const { state, dispatch } = useContext(UserContext)
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        if (image) {
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
                        localStorage.setItem('user', JSON.stringify({ ...state, avatar: data.url }))
                        dispatch({ type: 'UPDATEAVATAR', payload: data.url })
                        window.location.reload()
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [image])

    const updateAvatar = (file) => {
        setImage(file)
    }

    return (
        <div>
            <div>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} className="center"
                        src={state ? state.avatar : 'loading'}
                        alt="Not available" />
                </div>
                <div className="file-field input-field">
                        <div className="btn waves-effect waves-light" style={{ display: 'flex', margin: '0 auto', color: 'white', backgroundColor: '#ee6e73' }}>
                            <span>Update avatar</span>
                            <input type="file" onChange={(e) => updateAvatar(e.target.files[0])} />
                        </div>
                </div>
                <h4 className='center'>{state ? state.firstName : 'loading'} {state ? state.lastName : 'loading'}</h4>
                <h5 className='center'>{state ? state.email : 'loading'}</h5>
                <h5 className='center'>{'My orders: '}</h5>
                <h5 className='center'></h5>
            </div>
        </div>
    )
}

export default Profile