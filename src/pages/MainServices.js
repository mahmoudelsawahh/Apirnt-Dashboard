import MainServicesDash from "../components/DashBoard/MainServicesDash";
const MainServices = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Main Services</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Main Services</p>
      </div>
      <MainServicesDash />
    </div>
  );
};

export default MainServices;
