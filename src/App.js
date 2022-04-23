import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/UI/navbar/Navbar';

import AppRouter from './components/AppRouter';
import { AuthContext } from './context';


function App() {
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsUserAuthorized(true)
    }
    setIsLoading(false)
  }, [])


  return (
    <AuthContext.Provider value={{
      isUserAuthorized,
      setIsUserAuthorized,
      isLoading
    }}>
      <BrowserRouter>
        {isUserAuthorized ? <Navbar /> : null}
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
