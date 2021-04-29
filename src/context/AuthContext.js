import React, {useContext,useState,useEffect} from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState()

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }
    function logout(){
        return
    }
    function forgotPassword(email){
        return
    }
    function updateEmail(email){
        return
    }
    function updatePassword(email){
        return
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        forgotPassword,
        updateEmail,
        updatePassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}