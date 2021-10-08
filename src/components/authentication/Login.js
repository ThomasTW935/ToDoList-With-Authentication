import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const ERRORS = {
  INVALID_EMAIL: "auth/invalid-email",
  USER_DISABLED: "auth/user-disabled",
  USER_NOT_FOUND: "auth/user-not-found",
  WRONG_PASSWORD: "auth/wrong-password",
}

function setErrorMessage(error) {
  let errorMessage = ""
  switch (error) {
    case ERRORS.INVALID_EMAIL:
      errorMessage = "Invalid Email"
      break
    case ERRORS.USER_DISABLED:
      errorMessage = "User Disabled"
      break
    case ERRORS.USER_NOT_FOUND:
      errorMessage = "User not found"
      break
    case ERRORS.WRONG_PASSWORD:
      errorMessage = "Wrong password"
      break
    default:
      errorMessage = "Failed to login"
  }
  return errorMessage
}

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { currentUser, login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      setError("")
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch (err) {
      setError(setErrorMessage(err.code))
    }
    setLoading(false)
  }
  async function handleTestAccount(e) {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      await login("thomastw935@gmail.com", "VA2038wm")
      history.push("/")
    } catch (err) {
      setError(setErrorMessage(err.code))
    }
    setLoading(false)
  }
  return (
    <div className="center">
      <div className="formContainer">
        <h2>Log In</h2>
        {error && <div className="error">{error}</div>}
        {currentUser && currentUser.email}
        <form onSubmit={handleSubmit} className="form">
          <section>
            <label>Email</label>
            <input type="text" ref={emailRef} />
          </section>
          <section>
            <label>Password</label>
            <input type="password" ref={passwordRef} />
          </section>

          <button disabled={loading} className="btn btn-primary">
            Log In
          </button>
          <button
            disabled={loading}
            type="button"
            onClick={handleTestAccount}
            className="btn btn-secondary"
          >
            Test Account
          </button>
        </form>
        <div>
          Create an account here <Link to="/signup">Sign Up</Link>
        </div>
        <div>
          Forgot Password? <Link to="/forgot-password">Reset Password</Link>
        </div>
      </div>
    </div>
  )
}
