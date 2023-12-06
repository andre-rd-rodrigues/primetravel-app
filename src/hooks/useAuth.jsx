import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from 'src/config/firebaseConfig';

function useAuth() {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);

  // Function to sign in a user with email and password
  const signIn = async ({ email, password }) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);

        return console.log(errorCode, errorMessage);
      });
  };

  // Function to log out the current user
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error.message);
      throw error;
    }
  };

  // Effect to check if the user is authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signIn,
    signOut,
  };
}

export default useAuth;
