import BrandsDash from "../components/DashBoard/BrandsDash";

const Brands = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Brands</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Brands</p>
      </div>
      <BrandsDash />
    </div>
  );
};

export default Brands;
