import React from "react"
import "../styles/main.css"
import { AuthProvider } from "../context/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Signup from "./authentication/Signup"
import Profile from "./authentication/Profile"
import PrivateRoute from "./authentication/PrivateRoute"
import Login from "./authentication/Login"
import UpdateProfile from "./authentication/UpdateProfile"
import ForgotPassword from "./authentication/ForgotPassword"
import Todos from "./Todos/Todos"
import NavBar from "./NavBar"

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar />
          <Switch>
            <PrivateRoute exact path="/" component={Todos} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
