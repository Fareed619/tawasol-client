import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfileImage } from "../utils";
import { getCurrentProfile } from "../redux/modules/profiles";
import { connect } from "react-redux";
import defaultImage from "../assets/default.png";

const Sidebar = ({ getCurrentProfile, users: { user } }) => {
  const [image, setImage] = useState("");
  const [errored, setErrored] = useState(false);
  useEffect(() => {
    getCurrentProfile();

    if (user) {
      setImage(getProfileImage(user._id));
    }
  }, [getCurrentProfile, user]);

  const onError = () => {
    if (!errored) {
      setErrored(true);
      setImage(defaultImage);
    }
  };

  return (
    <div>
      <div className="sidebar">
        <div>
          <Link to="/home">
            <img src={image} onError={onError} className="profile" alt="" />
          </Link>
        </div>
        <Link to="/home">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/developers">Developers</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, { getCurrentProfile })(Sidebar);
