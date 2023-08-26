import ProductsDash from "../components/DashBoard/ProductsDash";

const Products = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Sub Products</h1>
      <div className="container-fluid">
        <div className="mb-5 flex">
          <span className="icon-home"></span>{" "}
          <p className="ml-1"> DashBoard / Sub Products</p>
        </div>
        <ProductsDash />
      </div>
    </div>
  );
};

export default Products;
