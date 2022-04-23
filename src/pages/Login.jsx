import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { AuthContext } from '../context';

const Login = () => {
  const { isUserAuthorized, setIsUserAuthorized } = useContext(AuthContext);

  const login = (e) => {
    e.preventDefault();
    setIsUserAuthorized(true);
    localStorage.setItem('auth', 'true');
  };

  return (
    <div>
      <h1 className='login-title'>Log in Page</h1>
      <p className='login-paragraph'>
        To see content in this App you have to log in
      </p>
      <form onSubmit={login}>
        <MyInput type='text' placeholder='Login' />
        <MyInput type='password' placeholder='Password' />
        <MyButton>Log in</MyButton>
      </form>
    </div>
  );
};

export default Login;
