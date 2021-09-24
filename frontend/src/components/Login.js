import React from "react";
import Header from './Header';
import { Link } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin(email, password);    
  }

  return(
    <>
    <Header linkText="Sign up" link="/signup"/>
    <div className="form__container">
      <h2 className="form__title">Log in</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          className="form__input"
          type="email"
          name="email"
          id="login-email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required />
        <input
          placeholder="Password"
          className="form__input"
          type="password"
          name="password"
          id="login-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required />
        <button className="form__button" type="submit" aria-label="login">Log in</button>
        <Link to="/signup" className="form__link">Not a member yet? Sign up here!</Link> 
      </form>
    </div>


    </>
  )
}

export default Login;