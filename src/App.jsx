import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import { Fragment, useEffect } from "react";
import Navbar from "./components/Navbar";
import store from "./redux/store";
import { Provider } from "react-redux";
import Register from "./components/Users/Register";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

import AlertTemplate from "react-alert-template-basic";
import Alert from "./components/Alert";
import Login from "./components/Users/Login";
import Private from "./components/Private";
import Home from "./components/Home";
import ProfileForm from "./components/ProfileForms/ProfileForm";
import AddEducation from "./components/ProfileForms/AddEducation";
import AddExperience from "./components/ProfileForms/AddExperience";
import { setAuthToken } from "./utils";
import { loadUser } from "./redux/modules/users";
import Developers from "./components/Developers";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post";
const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  transitions: transitions.SCALE,
};

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);
  console.log(store.getState());

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <AlertProvider template={AlertTemplate} {...options}>
            <Fragment>
              <Alert />
              <Navbar />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Private component={Home} />} />
                <Route
                  path="/create-profile"
                  element={<Private component={ProfileForm} />}
                />
                <Route
                  path="/add-education"
                  element={<Private component={AddEducation} />}
                />
                <Route
                  path="/add-experience"
                  element={<Private component={AddExperience} />}
                />
                <Route
                  path="/developers"
                  element={<Private component={Developers} />}
                />
                <Route
                  path="/profile/:id"
                  element={<Private component={Profile} />}
                />
                <Route
                  path="/settings"
                  element={<Private component={Settings} />}
                />
                <Route
                  path="/edit-profile"
                  element={<Private component={ProfileForm} />}
                />
                <Route path="/posts" element={<Private component={Posts} />} />
                <Route path="/posts/:id" element={<Private component={Post} />} />
              </Routes>
            </Fragment>
          </AlertProvider>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
