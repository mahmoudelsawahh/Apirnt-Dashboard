import UsersDash from "../components/DashBoard/UsersDash";

const Users = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Users</h1>
      <div className="container-fluid">
        <div className="mb-5 flex">
          <span className="icon-home"></span>{" "}
          <p className="ml-1"> DashBoard / Users</p>
        </div>
        <UsersDash />
      </div>
    </div>
  );
};

export default Users;
