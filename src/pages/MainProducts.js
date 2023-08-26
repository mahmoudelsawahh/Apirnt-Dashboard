import MainProductsDash from "../components/DashBoard/MainProductsDash";
const MainProducts = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Main Products</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Main Products</p>
      </div>
      <MainProductsDash />
    </div>
  );
};

export default MainProducts;
