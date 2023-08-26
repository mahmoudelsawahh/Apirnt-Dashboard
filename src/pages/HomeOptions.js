import HomeOptionsDash from "../components/DashBoard/HomeOptionsDash";

const HomeOptions = () => {
  return (
    <div className="container-fluid">
      {/* <h1 className="main-title">Home Options</h1> */}
      <div className="mb-5 flex">
        <span className="icon-home"></span>{" "}
        <p className="ml-1"> DashBoard / Home Options</p>
      </div>
      <HomeOptionsDash />
    </div>
  );
};

export default HomeOptions;
