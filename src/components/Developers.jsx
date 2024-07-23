import { connect } from "react-redux";
import { getProfiles } from "../redux/modules/profiles";
import { getProfileImage } from "../utils";
import defaultImage from "../assets/default.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Developers = ({ user, profiles: { profiles, loading }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <div>
      {loading ? null : (
        <>
          <div className="home">
            <div className="row">
              {profiles
                .filter((profile) => profile.user._id !== user._id)
                .map((profile) => {
                  return (
                    <div className="column" key={profile.user._id}>
                      <Link to={`/profile/${profile.user._id}`}>
                        {" "}
                        <Developer profile={profile} />
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function Developer({ profile }) {
  const [errored, setErrored] = useState(false);
  const [image, setImage] = useState(getProfileImage(profile.user._id));

  const onError = () => {
    setErrored(true);
    setImage(defaultImage);
  };

  return (
    <div className="card">
      <img src={image} alt="" onError={onError} />
      <div className="card-container">
        <p>{profile.user.name}</p>
        <p className="titles">{profile.status}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    profiles: state.prfiles,
  };
};
export default connect(mapStateToProps, { getProfiles })(Developers);
