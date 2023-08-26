import ServicesDash from "../components/DashBoard/ServicesDash";

const Services = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Sub Services</h1>
      <div className="container-fluid">
        <div className="mb-5 flex">
          <span className="icon-home"></span>{" "}
          <p className="ml-1"> DashBoard / Sub Services</p>
        </div>
        <ServicesDash />
      </div>
    </div>
  );
};

export default Services;
