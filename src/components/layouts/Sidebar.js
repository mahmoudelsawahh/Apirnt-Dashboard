import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../../styles/SideMenu.css";
import Cookies from "js-cookie";

const Sidebar = ({ children }) => {
  const location = useLocation();
  const [locat, setLocat] = useState("");
  const loc = useCallback(() => {
    setLocat(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    loc();
  }, [loc]);

  const Logout = () => {
    Cookies.remove("Aprint_Dash_Token");
    Cookies.remove("Aprint_dash_userInfo");
    window.location.reload();
    // Cookies.remove("StoreName");
    // Cookies.remove("StoreId");
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [nesteddLink, setNesedLink] = useState(true);
  const [nesteddLink2, setNesedLink2] = useState(true);

  return (
    <div
      style={{
        display: locat.includes("/login") ? "none " : "flex",
      }}
    >
      <div className={`sidebar ${isOpen ? "SideActive" : "SideNormal"}`}>
        <div
          className="top_section"
          style={{
            justifyContent: "center",
          }}
        >
          {Cookies.get("SuperAdminName") && (
            <p className=" relative User ">
              {isOpen && Cookies.get("SuperAdminName")}
            </p>
          )}
          <div
            style={{ marginLeft: isOpen ? "30px" : "0px" }}
            className={`bars ${!isOpen ? "BarsActive" : "BarsNone"}`}
          >
            <span className="icon-menu" onClick={toggle}></span>
          </div>
          <div
            style={{ marginLeft: isOpen ? "30px" : "0px" }}
            className="close"
          >
            <span
              className="icon-close"
              onClick={() => setIsOpen(false)}
            ></span>
          </div>
        </div>
        <NavLink
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          to={"/"}
          className="link"
        >
          <div className="icon">
            <span className={"icon-dashboard"}></span>
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Dashboard
          </div>
        </NavLink>
        <div>
          <div
            style={{
              cursor: "pointer",
              justifyContent: isOpen ? "flex-start" : "center",
            }}
            className="link"
            onClick={() => {
              setNesedLink((state) => !state);
            }}
          >
            <div className="icon">
              <span className={"icon-cube"}></span>
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              Products
            </div>
            {isOpen && (
              <div className="icon">
                <span className={"icon-keyboard_arrow_down"}></span>
              </div>
            )}
          </div>
          <div
            className="NestedLinks"
            style={{
              display: nesteddLink ? "none" : "block",
            }}
          >
            <NavLink
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
              }}
              to={"/product-categories"}
              className="link"
            >
              <div className="icon">
                <span className={"icon-books"}></span>
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Categories
              </div>
            </NavLink>
            <NavLink
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
              }}
              to={"/products"}
              className="link"
            >
              <div className="icon">
                <span className={"icon-cube"}></span>
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                products
              </div>
            </NavLink>

            <NavLink
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
              }}
              to={"/current-product-orders"}
              className="link"
            >
              <div className="icon">
                <span className={"icon-cart"}></span>
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Current Orders
              </div>
            </NavLink>
            <NavLink
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
              }}
              to={"/past-product-orders"}
              className="link"
            >
              <div className="icon">
                <span className={"icon-credit-card"}></span>
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Past Orders
              </div>
            </NavLink>
            <NavLink
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
              }}
              to={"/products-payment"}
              className="link"
            >
              <div className="icon">
                <span className={"icon-credit-card"}></span>
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Payment
              </div>
            </NavLink>
          </div>
        </div>

        <div>
          <div
            style={{
              cursor: "pointer",
              justifyContent: isOpen ? "flex-start" : "center",
            }}
            className="link"
            onClick={() => {
              setNesedLink2((state) => !state);
            }}
          >
            <div className="icon">
              <span className={"icon-miscellaneous_services"}></span>
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              Services
            </div>
            {isOpen && (
              <div className="icon">
                <span className={"icon-keyboard_arrow_down"}></span>
              </div>
            )}
          </div>
          <div
            className="NestedLinks"
            style={{
              display: nesteddLink2 ? "none" : "block",
            }}
          >
            <NavLink
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
              }}
              to={"/categories"}
              className="link"
            >
              <div className="icon">
                <span className={"icon-books"}></span>
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Categories
              </div>
            </NavLink>
            <NavLink
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
              }}
              to={"/sub-services"}
              className="link"
            >
              <div className="icon">
                <span className={"icon-medical_services"}></span>
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Services
              </div>
            </NavLink>

            <NavLink
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
              }}
              to={"/current-services-orders"}
              className="link"
            >
              <div className="icon">
                <span className={"icon-cart"}></span>
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Current Orders
              </div>
            </NavLink>
            <NavLink
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
              }}
              to={"/past-services-orders"}
              className="link"
            >
              <div className="icon">
                <span className={"icon-credit-card"}></span>
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Past Orders
              </div>
            </NavLink>
            <NavLink
              style={{
                justifyContent: isOpen ? "flex-start" : "center",
              }}
              to={"/servicess-payment"}
              className="link"
            >
              <div className="icon">
                <span className={"icon-credit-card"}></span>
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Payment
              </div>
            </NavLink>
          </div>
        </div>
        {/* /home-options */}
        <NavLink
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          to={"/home-options"}
          className="link"
        >
          <div className="icon">
            <span className={"icon-tools"}></span>
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Home Options
          </div>
        </NavLink>
        <NavLink
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          to={"/clients"}
          className="link"
        >
          <div className="icon">
            <span className={"icon-users"}></span>
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Clients
          </div>
        </NavLink>
        <NavLink
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          to={"/brands"}
          className="link"
        >
          <div className="icon">
            <span className={"icon-amazon"}></span>
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Brands
          </div>
        </NavLink>
        <NavLink
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          to={"/ads"}
          className="link"
        >
          <div className="icon">
            <span className={"icon-sale"}></span>
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Ads
          </div>
        </NavLink>
        <NavLink
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          to={"/coupons"}
          className="link"
        >
          <div className="icon">
            <span className={"icon-label"}></span>
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Coupons
          </div>
        </NavLink>
        <NavLink
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          to={"/users"}
          className="link"
        >
          <div className="icon">
            <span className={"icon-user-tie"}></span>
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Users
          </div>
        </NavLink>
        <NavLink
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          to={"/contact"}
          className="link"
        >
          <div className="icon">
            <span className={"icon-mail"}></span>
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Contact
          </div>
        </NavLink>

        <NavLink
          style={{
            justifyContent: isOpen ? "flex-start" : "center",
          }}
          to={"/login"}
          className="link"
          onClick={() => Logout()}
        >
          <div className="icon">
            <span className={"icon-exit"}></span>
          </div>
          <div
            style={{ display: isOpen ? "block" : "none", cursor: "pointer" }}
            className="link_text"
          >
            Logout
          </div>
        </NavLink>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
