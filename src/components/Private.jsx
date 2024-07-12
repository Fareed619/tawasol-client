import Sidebar from "./Sidebar";

const Private = ({ component: Component }) => (
  <div>
    <Sidebar />
    <Component />
  </div>
);

export default Private;
