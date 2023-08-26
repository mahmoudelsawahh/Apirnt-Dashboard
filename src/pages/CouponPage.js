import CouponsDash from "../components/DashBoard/CouponsDash";
const CouponPage = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Coupons</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Coupons</p>
      </div>
      <CouponsDash />
    </div>
  );
};

export default CouponPage;
