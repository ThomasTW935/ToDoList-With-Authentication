import React from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

export default function NavBar() {
    const {currentUser} = useAuth()

    const renderComponent=()=>{
        if(currentUser) {
            return <Link to='/profile' className='btn btn-primary'>Profile</Link>
        }
        return <>
            <Link to='/login' className='btn btn-primary'>Login</Link>
            <Link to='/signup' className='btn btn-neutral'>Sign Up</Link>
        </>
        
    }

    return (
        <nav>
            <h2><Link to='/'>TodoList</Link></h2>
            <div>
                { 
                    renderComponent() 
                }
               
            </div>
        </nav>
    )
}
