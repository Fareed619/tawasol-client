import { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../redux/modules/users";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { password, email } = formData;

  const onChange = (e) => {
    return setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    login(email, password);

    // const { data } = await api.post("/users/register", {
    //   name,
    //   email,
    //   password,
    // });
    // console.log(data);
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="main login">
      <p className="form-title" align="center">
        Sign In
      </p>
      <form className="form1" onSubmit={handleSubmitForm}>
        <input
          type="text"
          className="input-text"
          name="email"
          value={email}
          placeholder="Email"
          align="center"
          onChange={onChange}
          required
        />
        <input
          type="password"
          className="input-text"
          name="password"
          value={password}
          placeholder="Password"
          align="center"
          onChange={onChange}
          required
        />

        <input
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: "36%" }}
          align="center"
          value="Login"
        />
        <p className="forgot" align="center">
          New to TawaSol? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

// what are the props you must expected them

Login.propTypes = {
  login: PropTypes.func.isRequired,

  //   isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
  };
};

export default connect(mapStateToProps, { login })(Login);
