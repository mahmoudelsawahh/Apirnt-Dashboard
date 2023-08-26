import ServicesPaymentDash from "../components/DashBoard/Services/ServicesPaymentDash";

const ServicessPayment = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Services Payment</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Services Payment</p>
      </div>
      <ServicesPaymentDash />
    </div>
  );
};

export default ServicessPayment;
