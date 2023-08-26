import ClientDash from "../components/DashBoard/ClientDash";

const Clients = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Clients</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Clients</p>
      </div>
      <ClientDash />
    </div>
  );
};

export default Clients;
