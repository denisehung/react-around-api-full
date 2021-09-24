import React from "react";
import Header from './Header';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleRegister(email, password);    
  }
  
  return(
    <>
    <Header linkText="Log in" link="/signin"/>
    <div className="form__container">
      <h2 className="form__title">Sign up</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          className="form__input"
          type="email"
          name="email"
          id="registration-email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required />
        <input
          placeholder="Password"
          className="form__input"
          type="password"
          name="password"
          id="registration-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required />
        <button className="form__button" type="submit" aria-label="Sign up">Sign up</button>
        <Link to="/signin" className="form__link">Already a member? Log in here!</Link> 
      </form>
    </div>


    </>
  )
}

export default Register;