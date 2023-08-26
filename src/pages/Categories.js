import CategoriesDash from "../components/DashBoard/CategoriesDash";
const Categories = () => {
  return (
    <div className="container-fluid">
      <h1 className="main-title">Services Categories</h1>
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Services Categories</p>
      </div>
      <CategoriesDash />
    </div>
  );
};

export default Categories;
