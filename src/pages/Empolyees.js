import EmployeeDash from "../components/DashBoard/EmployeeDash";

const Empolyees = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Employees</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Categories</p>
      </div>
      <EmployeeDash />
    </div>
  );
};

export default Empolyees;
