import CurrentOrder from "../components/DashBoard/Products/CurrentOrder";
const ProductOrders = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Product Current Orders</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Product Current Orders</p>
      </div>
      <CurrentOrder />
    </div>
  );
};

export default ProductOrders;
