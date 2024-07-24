import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

const Private = ({
  component: Component,
  users: { isAuthenticated, loading },
}) => (
  <>
    {loading ? (
      <Spinner />
    ) : isAuthenticated ? (
      <>
        {" "}
        <Sidebar />
        <Component />{" "}
      </>
    ) : (
      <Navigate to="/login"> </Navigate>
    )}
  </>
);
const mapStatToProps = (state) => ({
  users: state.users,
});

export default connect(mapStatToProps)(Private);
