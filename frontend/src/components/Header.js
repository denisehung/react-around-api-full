import React from "react";
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  return(
    <header className="header">
      <img src={logo}  className="logo" alt="logo" />
      <div className="header__links">
        {props.loggedIn && <p className="header__email">{props.email}</p>}
        <Link className="header__link" to={props.link} onClick={props.handleLogout} style={ props.loggedIn ? { color: '#A9A9A9'} : {}}>{props.linkText}</Link>
      </div>
    </header>
  );
}

export default Header;