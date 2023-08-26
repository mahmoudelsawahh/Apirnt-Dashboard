import PastServicesOrder from "../components/DashBoard/Services/PastServicesOrder";
const PastServices = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Services Past Orders</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Services Past Orders</p>
      </div>
      <PastServicesOrder />
    </div>
  );
};

export default PastServices;
