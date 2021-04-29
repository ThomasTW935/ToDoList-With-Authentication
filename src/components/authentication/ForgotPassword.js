import React, { useRef, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'

export default function ForgotPassword() {
    const emailRef = useRef()
    const {currentUser, resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        if(!emailRef.current.value) return

        try {
          setLoading(true)
          setError('')
          setMessage('')
          await resetPassword(emailRef.current.value)
          setMessage('Check email for futher instructions')
        } catch {
          setError('Failed to reset password')
        }
        setLoading(false)
    }
    return (
      <div className='center'>
        <div className='formContainer'>
          <h2>Recover Password</h2>
          {error && <div className='error'>{error}</div>}
          {message && <div className='message'>{message}</div>}
          <form onSubmit={handleSubmit} className='form'>
            <section>
              <label>Email</label>
              <input type='text' ref={emailRef}/>
            </section>
            <button disabled={loading} className='btn btn-primary'>Reset Password</button>
          </form>
         <Link className='btn btn-secondary' to='/login'>Cancel</Link>
        </div>
      </div>
    )
}
