import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase-config";

const AuthContext = createContext()

export function AuthContextProvider({ children }) {

  const [user, setUser] = useState({})

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => {
      unsubscribe()
    }
  }, [])


  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function UserAuth() {
  return useContext(AuthContext)
}
