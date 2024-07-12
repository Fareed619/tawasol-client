import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import { Fragment } from "react";
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

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  transitions: transitions.SCALE,
};

function App() {
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
              </Routes>
            </Fragment>
          </AlertProvider>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
