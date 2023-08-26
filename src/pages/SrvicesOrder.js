import CurrentServicesOrder from "../components/DashBoard/Services/CurrentServicesOrder";

const SrvicesOrder = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Services Current Orders</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Services Current Orders</p>
      </div>
      <CurrentServicesOrder />
    </div>
  );
};

export default SrvicesOrder;
