import PastOrdersDash from "../components/DashBoard/Products/PastOrdersDash";
const Pastorder = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Product Past Orders</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Product Past Orders</p>
      </div>
      <PastOrdersDash />
    </div>
  );
};

export default Pastorder;
