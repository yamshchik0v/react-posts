import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import cl from './Navbar.module.css';
import { AuthContext } from '../../../context/index';

const Navbar = () => {
  const { isUserAuthorized, setIsUserAuthorized } = useContext(AuthContext);

  const logout = () => {
    setIsUserAuthorized(false);
    localStorage.removeItem('auth');
  };

  return (
    <div className={cl.navbar}>
      <MyButton onClick={logout}>Log out</MyButton>
      <div className={cl.navbarLinks}>
        <Link to='/about'>About</Link>
        <Link to='/posts'>Posts</Link>
      </div>
    </div>
  );
};

export default Navbar;
