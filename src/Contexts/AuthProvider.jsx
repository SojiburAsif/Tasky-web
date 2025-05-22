import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';



const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider();

    // console.log(user, loading);

    const creatUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        return signOut(auth)
    }

    const googleSingIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const updateUser = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    };

    useEffect(() => {
        const unsubscribr = onAuthStateChanged(auth, (currentuser,) => {
            setuser(currentuser)
            // SiAwselasticloadbalancing(false)
            setLoading(false)
        });
        return () => {
            unsubscribr();
        }



    });


    const userInfo = {
        creatUser,
        loginUser,
        logout,
        user,
        setuser,
        loading,
        setLoading,
        googleSingIn,
        updateUser ,
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;