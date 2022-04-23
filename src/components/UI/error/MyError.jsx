import React from 'react';
import cl from './MyError.module.css';
const MyError = ({ err }) => {
  return (
    <div>
      <p className={cl.myError}>{err}</p>
    </div>
  );
};

export default MyError;
