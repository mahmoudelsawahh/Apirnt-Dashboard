import AddsDash from "../components/DashBoard/AddsDash";
// import BrandsDash from "../components/DashBoard/BrandsDash";

const Ads = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Ads</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Ads</p>
      </div>
      <AddsDash />
    </div>
  );
};

export default Ads;
