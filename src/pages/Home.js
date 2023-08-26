import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../styles/Home.module.css";
import { getHome } from "../store/HomeSlice";

const Home = () => {
  // const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const { HomeArr } = useSelector((state) => state.HomeSlice);
  useEffect(() => {
    if (!HomeArr) {
      dispatch(getHome());
    }
  }, [HomeArr, dispatch]);

  return (
    <div className="container-fluid">
      <div className="mb-5 flex   justify-content-between align-items-center  ">
        <div className=" flex">
          <span className="icon-home"></span>{" "}
          <p className="ml-1"> DashBoard / Home</p>
        </div>

        {/* 
        
        <div className={styles.total}>
            <div
              className={`${styles.total_sections} `}
              id={`total_sections${1}`}
            >
              <div className={`${styles.img_section}`} id={`total${1}`}>
                <span className="icon-money"></span>
              </div>
              <div className={`${styles.details}`}>
                <h6>admins </h6>
                <h3>{HomeArr.admins}</h3>
              
                </div>
            </div>
            <div
              className={`${styles.total_sections} `}
              id={`total_sections${2}`}
            >
              <div className={`${styles.img_section}`} id={`total${2}`}>
                <span className="icon-coins"></span>
              </div>
              <div className={`${styles.details}`}>
                <h6>Categories </h6>
                <h3>{HomeArr.users}</h3>
              
              </div>
            </div>
            <div
              className={`${styles.total_sections} `}
              id={`total_sections${4}`}
            >
              <div className={`${styles.img_section}`} id={`total${4}`}>
                <span className="icon-star-full"></span>
              </div>
              <div className={`${styles.details}`}>
                <h6>Orders</h6>
                <h3>{HomeArr.orders}</h3>
              
              </div>
            </div>
          </div> */}
      </div>
      {HomeArr && (
        <div className="grid">
          {/* <div className="col-12 md:col-4">
            <div
              className={`${styles.total_sections} `}
              id={`total_sections${1}`}
            >
              <div className={`${styles.img_section}`} id={`total${1}`}>
                <span className="icon-star-full"></span>
              </div>
              <div className={`${styles.details}`}>
                <h6>Admins</h6>
                <h3>{HomeArr.admins}</h3>
              </div>
            </div>
          </div> */}
          <div className="col-12 md:col-4">
            <div
              className={`${styles.total_sections} `}
              id={`total_sections${2}`}
            >
              <div className={`${styles.img_section}`} id={`total${1}`}>
                <span className="icon-star-full"></span>
              </div>
              <div className={`${styles.details}`}>
                <h6>Users</h6>
                <h3>{HomeArr.users}</h3>
              </div>
            </div>
          </div>
          {/* <div className="col-12 md:col-4">
            <div
              className={`${styles.total_sections} `}
              id={`total_sections${3}`}
            >
              <div className={`${styles.img_section}`} id={`total${3}`}>
                <span className="icon-star-full"></span>
              </div>
              <div className={`${styles.details}`}>
                <h6>Orders</h6>
                <h3>{HomeArr.orders}</h3>
              </div>
            </div>
          </div> */}
          <div className="col-12 md:col-4">
            <div
              className={`${styles.total_sections} `}
              id={`total_sections${4}`}
            >
              <div className={`${styles.img_section}`} id={`total${2}`}>
                <span className="icon-star-full"></span>
              </div>
              <div className={`${styles.details}`}>
                <h6>Products Categories</h6>
                <h3>{HomeArr.product_categories}</h3>
              </div>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div
              className={`${styles.total_sections} `}
              id={`total_sections${4}`}
            >
              <div className={`${styles.img_section}`} id={`total${3}`}>
                <span className="icon-star-full"></span>
              </div>
              <div className={`${styles.details}`}>
                <h6>Services Categories</h6>
                <h3>{HomeArr.service_categories}</h3>
              </div>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div
              className={`${styles.total_sections} `}
              id={`total_sections${5}`}
            >
              <div className={`${styles.img_section}`} id={`total${4}`}>
                <span className="icon-star-full"></span>
              </div>
              <div className={`${styles.details}`}>
                <h6>Products</h6>
                <h3>{HomeArr.products}</h3>
              </div>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div
              className={`${styles.total_sections} `}
              id={`total_sections${5}`}
            >
              <div className={`${styles.img_section}`} id={`total${5}`}>
                <span className="icon-star-full"></span>
              </div>
              <div className={`${styles.details}`}>
                <h6>Services</h6>
                <h3>{HomeArr.services}</h3>
              </div>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div
              className={`${styles.total_sections} `}
              id={`total_sections${5}`}
            >
              <div className={`${styles.img_section}`} id={`total${6}`}>
                <span className="icon-star-full"></span>
              </div>
              <div className={`${styles.details}`}>
                <h6>Orders</h6>
                <h3>{HomeArr.orders}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className="grid">
        <div className="col-12 md:col-8 lg:col-8 mt-5">
          <div className={`${styles.location} ${styles.MapLocation}`}>
            <Coupon />
          </div>
        </div>
      </div> */}

      {/* {Pharmacy && (
        <>
          <div className=" grid  ">
            <div className="col-12 md:col-6 lg:col-6 mt-5     ">
              <div className={styles.MapLocation}>
                <iframe
                  loading="lazy"
                  title="map"
                  src={`https://maps.google.com/maps?q=${Pharmacy.latitude},${Pharmacy.longitude}&z=8&output=embed`}
                  // frameBorder="0"
                  className={styles.location}
                  style={{ border: 0 }}
                ></iframe>
                <div className={styles.loc}>
                  <GoLocation />
                  <p>{Pharmacy.address}</p>
                </div>
              </div>
            </div>
            <div className="col-12 md:col-6 lg:col-6 mt-5">
              <div className={`${styles.location} ${styles.MapLocation}`}>
                <h2 className=" text-center main-two">Description</h2>
                <p className="  text-justify m-5">{Pharmacy.description}</p>
              </div>
            </div>
            <div className="col-12 md:col-4 lg:col-4 mt-5">
              <div className={`${styles.location} ${styles.MapLocation}`}>
                <div className={styles.ImageContainer}>
                  <img src={Pharmacy.image} alt={Pharmacy.name} />
                </div>
              </div>
            </div>
            <div className="col-12 md:col-8 lg:col-8 mt-5">
              <div className={`${styles.location} ${styles.MapLocation}`}>
                <Coupon />
              </div>
            </div>
          </div>
        </>
      )} */}
    </div>
  );
};

export default Home;
