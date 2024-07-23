import { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addExperience } from "../../redux/modules/profiles";
import propTypes from "prop-types";

const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    current: false,
    from: "",
    to: "",
  });
  const navigate = useNavigate();

  const { title, company, location, current, from, to } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, navigate);
  };
  return (
    <div
      className="main"
      style={{ textAlign: "center", width: 700, padding: 15 }}
    >
      <p className="form-title">Add Experience</p>
      <small>* = required field</small>
      <form onSubmit={onSubmit} className="form1">
        <div>
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
        </div>
        <div>
          <h3 style={{ marginLeft: 110, textAlign: "left", marginBottom: 20 }}>
            From Date
          </h3>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div>
          <p style={{ marginLeft: 110, textAlign: "left", marginBottom: 20 }}>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
              }}
            />
            Current Job
          </p>
        </div>
        <div>
          <h3 style={{ marginLeft: 110, textAlign: "left", marginBottom: 20 }}>
            ToDate
          </h3>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={current}
          />
        </div>

        <div>
          <input type="submit" className="btn btn-primary" />
          <Link className="btn btn-light" to="/home">
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

AddExperience.propTypes = {
    addExperience: propTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
