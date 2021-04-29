import React from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'

export default function Profile() {
    const {currentUser} = useAuth()

    return (
        <div className='center'>
        <div className='formContainer'>
            <h2>Profile</h2>
            <div className='profile'>
                <strong>Email:</strong>
                <span>{currentUser.email}</span>
            </div>
            <Link className='btn btn-primary' to='/update-profile'>Update Profile</Link>
            <Link to='/signup'>Log out</Link>
        </div>
      </div>
    )
}
