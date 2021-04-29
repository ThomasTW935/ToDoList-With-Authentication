import React, {useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'

export default function Profile() {
    const {currentUser, logout} = useAuth()
    const [error, setError] = useState('')
    const history = useHistory()

    async function handleLogout(){
        try {
            setError('')
            await logout()
            history.push('/')
        } catch  {
            setError('Failed to log out')
        }
    }

    return (
        <div className='center'>
        <div className='formContainer'>
            <h2>Profile</h2>
            <div className='profile'>
                <strong>Email:</strong>
                <span>{currentUser.email}</span>
            </div>
            <Link className='btn btn-primary' to='/update-profile'>Update Profile</Link>
            <button className='btn btn-secondary' onClick={handleLogout}>Log out</button>
        </div>
      </div>
    )
}
