import ProductPaymentDash from "../components/DashBoard/Products/ProductPaymentDash";

const ProductPayment = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Prodcuts Payment</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Prodcuts Payment</p>
      </div>
      <ProductPaymentDash />
    </div>
  );
};

export default ProductPayment;
