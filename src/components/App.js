import React from 'react'
import '../styles/main.css'
import { AuthProvider } from '../context/AuthContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Signup from './authentication/Signup'
import Profile from './authentication/Profile'
import PrivateRoute from './authentication/PrivateRoute'
import Login from './authentication/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute path='/profile' component={Profile} />
            <Route path='/signup' component={Signup}/>
            <Route path='/login' component={Login}/>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
