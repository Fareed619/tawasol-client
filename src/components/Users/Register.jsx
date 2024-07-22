import { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { showAlertMessage } from "../../redux/modules/alerts";
import { register } from "../../redux/modules/users";
import PropTypes from "prop-types";
import axios from "axios";
import { api } from "../../utils";

const Register = ({ isAuthenticated, register, showAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  // fareed5@gmail.com 
  // 1234567
  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    return setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      showAlert("Password do not match", "error");
    } else {
      register({ name, email, password });
    }

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
    <div className="main register">
      <p className="form-title" align="center">
        Sign Up
      </p>
      <form className="form1" onSubmit={handleSubmitForm}>
        <input
          type="text"
          className="input-text"
          name="name"
          value={name}
          placeholder="Name"
          align="center"
          onChange={onChange}
        />
        <input
          type="text"
          className="input-text"
          name="email"
          value={email}
          placeholder="Email"
          align="center"
          onChange={onChange}
        />
        <input
          type="password"
          className="input-text"
          name="password"
          value={password}
          placeholder="Password"
          align="center"
          onChange={onChange}
        />
        <input
          type="password"
          className="input-text"
          name="password2"
          value={password2}
          placeholder="Confirm Password"
          align="center"
          onChange={onChange}
        />
        <input
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: "36%" }}
          align="center"
          value="Register"
        />
        <p className="forgot" align="center">
          Already have an account? <Link to="/login"> Sign In</Link>
        </p>
      </form>
    </div>
  );
};

// what are the props you must expected them

Register.propTypes = {
  register: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  //   isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showAlert: (msg, info) => dispatch(showAlertMessage(msg, info)),
    register: (formData) => dispatch(register(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
