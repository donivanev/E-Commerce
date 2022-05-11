import React, { useContext } from 'react'
import { UserContext } from '../../App'

const Profile = () => {

    const {state, dispatch} = useContext(UserContext)

    return (
        <div>
            <div>
                <div>
                    <img style={{width: "160px", height: "160px", borderRadius: "80px"}} className="center" 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAZyFdywMPXJlTpPImDs4x5RkRvjCqAk6tsA&usqp=CAU" 
                        alt="Not available"/>
                </div>
                <h4 className='center'>{state ? state.firstName : "loading"} {state ? state.lastName : "loading"}</h4>
                <h5 className='center'>{state ? state.email : "loading"}</h5>
                <h5 className='center'>{'My orders: '}</h5>
                <h5 className='center'></h5>
            </div>
        </div>
    )
}

export default Profile