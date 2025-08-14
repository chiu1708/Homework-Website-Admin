import { onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./Firebase";
import { GoogleAuthProvider } from "firebase/auth";

const AuthContext = createContext({googleSignIn: null, logOut: null, user: null});

export const AuthContextProvider = ({children}) => {
  
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    }
    catch (error) {
      console.log(error);
    }
  }

  const logOut = () => {
    signOut(auth);
  }

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <AuthContext value={{googleSignIn, logOut, user}}>
      {children}
    </AuthContext>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext);
}