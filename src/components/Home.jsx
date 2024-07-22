import { connect } from "react-redux";
import {
  deleteEducation,
  deleteExperience,
  getCurrentProfile,
} from "../redux/modules/profiles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfileImage } from "../utils";
import BasicInfo from "./profileInfo/BasicInfo";
import defaultImage from "../assets/default.png";
import Education from "./profileInfo/Education";
const Home = ({
  profile,
  user,
  getCurrentProfile,
  deleteEducation,
  deleteExperience,
}) => {
  console.log("profile in  home componnet", profile);
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
    <div className="home">
      {profile === null ? (
        <div>
          <p style={{ padding: 10 }}> Please Create a profile</p>
          <Link to="/create-profile" className="btn btn-primary">
            Create profile
          </Link>
        </div>
      ) : (
        <div>
          <div className="home-row">
            <div className="home-column" style={{ textAlign: "center" }}>
              <img
                src={image}
                alt="profile-image"
                className="profile-picture"
                onError={onError}
              />
              <p className="name">{profile.user.name}</p>
            </div>
            <div className="home-column">
              <BasicInfo profile={profile} />
              <div className="social">
                {profile.social
                  ? Object.keys(profile.social)
                      .filter((media) => profile.social[media] !== "")
                      .map((media) => {
                        return (
                          <a
                            key={media}
                            rel="noreferrer"
                            target="_blank"
                            href={profile.social[media]}
                          >
                            <i className={`fab fa=${media} fa-2x`} />
                          </a>
                        );
                      })
                  : null}
              </div>
            </div>
          </div>

          <div className="home-row">
            <div className="home-column">
              <div className="home-row">
                <div className="home-column">
                  <h3>Education</h3>
                </div>
                <div className="home-column">
                  <Link to="/add-education" className="add-button">
                    <i className="fa fa-plus-circle fa-2x"></i>{" "}
                  </Link>
                </div>
              </div>

              <Education profile={profile} deleteEducation={deleteEducation} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.prfiles.profile,
  user: state.users.user,
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteEducation,
  deleteExperience,
})(Home);
