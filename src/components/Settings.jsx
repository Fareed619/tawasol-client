import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProfile } from "../redux/modules/profiles";
const Settings = ({ deleteProfile }) => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="post-card center">
        <div>
          <div style={{ marginBottom: 15 }}>
            <p>Update your profile information</p>
          </div>
          <div style={{ marginBottom: 15 }}>
            <Link className="btn btn-primary" to="/edit-profile">
              Edit Account
            </Link>
          </div>
        </div>
      </div>
      <div className="post-card center">
        <div>
          <div>
            {" "}
            <p>Update your profile information</p>
          </div>
          <div>
            <button
              onClick={() => {
                deleteProfile(navigate);
              }}
              className="btn btn-danger"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { deleteProfile })(Settings);
