import React, {useState, useEffect, createContext, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const person = auth().currentUser;
  GoogleSignin.configure({
    webClientId:
      'kaldırıldı',
  });

  auth().onAuthStateChanged(person => {
    if (person) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  const googleLogin = async () => {
    if (loading) {
      console.log('Giriş işlemi zaten devam ediyor...');
      return;
    }
    setLoading(true);
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      setAuthUser(person);
      await auth().signInWithCredential(googleCredential);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const googleSignOut = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        await auth().signOut();
        console.log('Oturum başarıyla kapatıldı.');
      } else {
        console.log('Kullanıcı zaten oturum açmamış.');
      }
    } catch (error) {
      console.error('Oturum kapatılırken hata oluştu:', error);
    }
  };

  const contextValues = {
    googleLogin,
    authenticated,
    setAuthUser,
    authUser,
    googleSignOut,
    loading,
    setLoading,
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useContext must be used with a UserContext');
  }
  return context;
};

export default AuthContextProvider;
