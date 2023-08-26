import ProdcutCategoryDash from "../components/DashBoard/ProdcutCategoryDash";

const ProductCategory = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Products Categories</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> Dashboard / Products Categories</p>
      </div>
      <ProdcutCategoryDash />
    </div>
  );
};

export default ProductCategory;
