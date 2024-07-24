import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../redux/modules/users";

const Navbar = ({ logOut, users: { isAuthenticated } }) => {
  const authLinks = (
    <ul>
      <li>
        <Link
          to="/"
          onClick={() => {
            logOut();
          }}
        >
          Logout
        </Link>
      </li>
    </ul>
  );
  const links = (
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-navbar">
      <h1>
        <Link to="/" className="logo-navbar">
          TawaSol
        </Link>
      </h1>
      <>{isAuthenticated ? authLinks : links}</>
    </nav>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, { logOut })(Navbar);
