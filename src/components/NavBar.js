import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar() {
    return (
        <nav>
            <h2><Link to='/'>TodoList</Link></h2>
            <div>
                <Link to='/login' className='btn btn-primary'>Login</Link>
                <Link to='/signup' className='btn btn-neutral'>Sign Up</Link>
            </div>
        </nav>
    )
}
