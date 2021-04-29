import React, { useRef, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {currentUser, login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()


        try {
          setLoading(true)
          setError('')
          await login(emailRef.current.value,passwordRef.current.value)
          history.push('/profile')
        } catch {
          setError('Failed to create an account')
        }
        setLoading(false)
    }
    return (
      <div className='center'>
        <div className='formContainer'>
          <h2>Log In</h2>
          {error && <div className='error'>{error}</div>}
          {currentUser && currentUser.email}
          <form onSubmit={handleSubmit} className='form'>
            <section>
              <label>Email</label>
              <input type='text' ref={emailRef}/>
            </section>
            <section>
              <label>Password</label>
              <input type='password' ref={passwordRef}/>
            </section>
            
            <button disabled={loading} className='btn btn-primary'>Log In</button>
          </form>
          <div>Create an account here <Link to='/signup'>Sign Up</Link></div>
        </div>
      </div>
    )
}
