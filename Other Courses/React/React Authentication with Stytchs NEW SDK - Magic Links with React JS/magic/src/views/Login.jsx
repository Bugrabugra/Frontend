import React from 'react';


const Login = ({ handleLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { email } = e.target.elements;
    handleLogin(email.value);
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="e.g. botken@g.com"/>
        <input type="submit" value="Login"/>
      </form>
    </>
  );
};

export default Login;
