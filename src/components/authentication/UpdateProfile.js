import React, { useRef, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updateEmail,updatePassword} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
          return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError('')

        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(()=>{
            history.push('/profile')
        }).catch(()=>{
            setError('Failed to update profile')
        }).finally(()=>{
            setLoading(false)
        })
    }
    return (
      <div className='center'>
        <div className='formContainer'>
          <h2>Update Profile</h2>
          {error && <div className='error'>{error}</div>}
          <form onSubmit={handleSubmit} className='form'>
            <section>
              <label>Email</label>
              <input defaultValue={currentUser.email} type='text' ref={emailRef}/>
            </section>
            <section>
              <label>Password</label>
              <input type='password' ref={passwordRef}/>
            </section>
            <section>
              <label>Password Confirm</label>
              <input type='password' ref={passwordConfirmRef}/>
            </section>
            <button  disabled={loading} className='btn btn-primary'>Update</button>
          </form>
          <Link className='btn btn-secondary' to='/profile'>Cancel</Link>
        </div>
      </div>
    )
}
