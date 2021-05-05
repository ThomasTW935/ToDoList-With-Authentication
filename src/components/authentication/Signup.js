import React, { useRef, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, signup} = useAuth()
    const [error, setError] = useState('')
    const [loading,setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
          return setError('Passwords do not match')
        }

        try {
          setLoading(true)
          setError('')
          await signup(emailRef.current.value,passwordRef.current.value)
          history.push('/')
        } catch {
          setError('Failed to create an account')
        }
        setLoading(false)

    }
    return (
      <div className='center'>
        <div className='formContainer'>
          <h2>Sign Up</h2>
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
            <section>
              <label>Password Confirm</label>
              <input type='password' ref={passwordConfirmRef}/>
            </section>
            <button disabled={loading} className='btn btn-primary'>Sign Up</button>
          </form>
          <div>Already have an account? <Link to='/login'>Log In</Link></div>
        </div>
      </div>
    )
}
