/* eslint-disable react/no-typos */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
} from "../../redux/modules/profiles";

import PropTypes from "prop-types";

const initialState = {
  company: "",
  website: "",
  location: "",
  country: "",
  status: "",
  skills: "",
  bio: "",
  twitter: "",
  youtube: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  github: "",
};

const ProfileForm = ({
  profile,
  loading,
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      getCurrentProfile();
    }
    if (profile && !loading) {
      const profileData = { ...initialState };
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    country,
    status,
    skills,
    bio,
    twitter,
    youtube,
    facebook,
    instagram,
    linkeding,
    github,
  } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };

  const onFileChange = (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    uploadProfileImage(data);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="main" style={{ width: 600, textAlign: "center" }}>
      <p className="form-title">Edit Profile</p>
      <form className="form1" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option>Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Intern">Intern</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="form-group">
          <input type="file" onChange={onFileChange} />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={country}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="a short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
        </div>

        <div>
          <button
            className="btn btn-light"
            type="button"
            onClick={() => {
              toggleSocialInputs((prev) => !prev);
            }}
          >
            {" "}
            Social Networks
          </button>
        </div>

        {displaySocialInputs ? (
          <>
            <div>
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>
            <div>
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>
            <div>
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
            <div>
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="youtube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>
            <div>
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="linkedin URL"
                name="linkedin"
                value={linkeding}
                onChange={onChange}
              />
            </div>
            <div>
              <i className="fab fa-github fa-2x" />
              <input
                type="text"
                placeholder="github URL"
                name="github"
                value={github}
                onChange={onChange}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        <input type="submit" className="btn btn-primary" value="submit" />
      </form>
    </div>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
  // profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.prfiles.profile,
    loading: state.prfiles.loading,
  };
};

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
})(ProfileForm);
