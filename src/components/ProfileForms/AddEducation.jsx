import { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addEducation } from "../../redux/modules/profiles";
import propTypes from "prop-types";

const AddEducation = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    current: false,
    from: "",
    to: "",
  });
  const navigate = useNavigate();

  const { school, degree, fieldofstudy, current, from, to } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, navigate);
  };
  return (
    <div
      className="main"
      style={{ textAlign: "center", width: 700, padding: 15 }}
    >
      <p className="form-title">Add Education</p>
      <small>* = required field</small>
      <form onSubmit={onSubmit} className="form1">
        <div>
          <input
            type="text"
            placeholder="* School"
            name="school"
            value={school}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="field of study"
            name="fieldofstudy"
            value={fieldofstudy}
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
            Current School
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

AddEducation.propTypes = {
  addEducation: propTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
