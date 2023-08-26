import { AiOutlineCheck } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import image from "../../../images/test.webp";
import image2 from "../../../images/test2.webp";
import { InputText } from "primereact/inputtext";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const ShowProduct = () => {
  const { id } = useParams();
  const [value, setValue] = useState("1");
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "mm", code: "NY" },
    { name: "cm", code: "RM" },
    { name: "in", code: "LDN" },
    { name: "ft", code: "IST" },
    { name: "m", code: "PRS" },
  ];
  const dispatch = useDispatch();
  // useEffect(() =>{

  // },[])
  return (
    <div className="Product_test">
      <div className="container-xxl">
        <div className="grid">
          <div className="md:col-8">
            <div className="grid">
              <div className="col-12">
                <div className="CardTest">
                  <h1>PVC Banner Printing</h1>
                  <div className="Toogelbuttons">
                    <h2 className="ToggleActive">Overview </h2>
                    <h2>Overview </h2>
                    <h2>Overview </h2>
                    <h2>Overview </h2>
                  </div>
                  <p>
                    We can print PVC banners to any size, with prices starting
                    at £16.25/sq meter. All banners are printed using
                    full-colour matt-finish printing at 1440dpi high resolution,
                    using eco-friendly inks that are fade and scratch resistant.
                    Banners are printed on 510gsm PVC which is lightweight,
                    extremely durable and weather resistant. Options for
                    printing on heavier 720gsm blockout PVC banner material are
                    also available. Banners can be fitted with your choice of
                    nickel plated solid brass eyelets or pole pockets.
                  </p>
                  <div className="grid">
                    <div className="md:col-6 ProCheck">
                      <AiOutlineCheck />
                      Print to any size
                    </div>
                    <div className="md:col-6 ProCheck">
                      <AiOutlineCheck />
                      Print to any size
                    </div>
                    <div className="md:col-6 ProCheck">
                      <AiOutlineCheck />
                      Print to any size
                    </div>
                    <div className="md:col-6 ProCheck">
                      <AiOutlineCheck />
                      Print to any size
                    </div>
                    <div className="md:col-6 ProCheck">
                      <AiOutlineCheck />
                      Print to any size
                    </div>
                    <div className="md:col-6 ProCheck">
                      <AiOutlineCheck />
                      Print to any size
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="CardTest">
                  <h2>Create your order</h2>
                  <div className="grid  aLLCenter">
                    <div className="md:col-6">
                      <div className="grid cardCenter">
                        <div className="md:col-8">
                          <label htmlFor="Width ">Width </label>
                          <input type="text" name="Width" id="Width" />
                        </div>
                        <div className="md:col-4">
                          <Dropdown
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.value)}
                            options={cities}
                            optionLabel="name"
                            placeholder="mm"
                            className="w-full "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="md:col-6">
                      <div className="grid cardCenter">
                        <div className="md:col-8">
                          <label htmlFor="Height ">Height </label>
                          <input type="text" name="Height" id="Height" />
                        </div>
                        <div className="md:col-4">
                          <Dropdown
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.value)}
                            options={cities}
                            optionLabel="name"
                            placeholder="mm"
                            className="w-full "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="md:col-6">
                      <div className="grid cardCenter">
                        <div className="col-12">
                          <label htmlFor="Height ">Material </label>
                          <div className="Chose text-center Chose_active">
                            510gsm Premium PVC
                          </div>
                          <p>Our most popular premium PVC banner material.</p>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-6">
                      <div className="grid cardCenter">
                        <div className="col-12">
                          <div className="Chose text-center">
                            510gsm Premium PVC
                          </div>
                          <p>Our most popular premium PVC banner material.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="grid cardCenter">
                        <div className="col-12">
                          <label htmlFor="change ">Finishing option </label>
                          <p>Our most popular premium PVC banner material.</p>
                          <div className="grid">
                            <div className="md:col-4 change_div Change_active">
                              <div className="Card_Image">
                                <div className="ImageTesetCon">
                                  <img src={image} alt="" />
                                </div>
                                <h3>Hemmed with eyelets</h3>
                              </div>
                              <p>
                                25mm hemmed edge with eyelets approx every
                                500mm.
                              </p>
                            </div>
                            <div className="md:col-4 change_div">
                              <div className="Card_Image">
                                <div className="ImageTesetCon">
                                  <img src={image} alt="" />
                                </div>
                                <h3>Hemmed with eyelets</h3>
                              </div>
                              <p>
                                25mm hemmed edge with eyelets approx every
                                500mm.
                              </p>
                            </div>
                            <div className="md:col-4 change_div">
                              <div className="Card_Image">
                                <div className="ImageTesetCon">
                                  <img src={image} alt="" />
                                </div>
                                <h3>Hemmed with eyelets</h3>
                              </div>
                              <p>
                                25mm hemmed edge with eyelets approx every
                                500mm.
                              </p>
                            </div>
                            <div className="md:col-4 change_div">
                              <div className="Card_Image">
                                <div className="ImageTesetCon">
                                  <img src={image} alt="" />
                                </div>
                                <h3>Hemmed with eyelets</h3>
                              </div>
                              <p>
                                25mm hemmed edge with eyelets approx every
                                500mm.
                              </p>
                            </div>
                            <div className="md:col-4 change_div">
                              <div className="Card_Image">
                                <div className="ImageTesetCon">
                                  <img src={image} alt="" />
                                </div>
                                <h3>Hemmed with eyelets</h3>
                              </div>
                              <p>
                                25mm hemmed edge with eyelets approx every
                                500mm.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-6">
                      <div className="grid cardCenter">
                        <div className="col-12">
                          <label htmlFor="Height ">Print setup & design </label>
                          <div className="Chose text-center ">Just Print</div>
                          <p>
                            Select this option if you have print ready artwork.
                            Please ensure that the dimensions, proportions, and
                            quality have all been checked. Optional artwork
                            checks available.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-6">
                      <div className="grid cardCenter">
                        <div className="col-12">
                          <div className="Chose text-center">Just Print</div>
                          <p>
                            Select this option if you have print ready artwork.
                            Please ensure that the dimensions, proportions, and
                            quality have all been checked. Optional artwork
                            checks available.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="grid cardCenter">
                        <div className="col-12">
                          <label htmlFor="Height ">
                            Files and Finishing Notes{" "}
                          </label>
                          <p>Files and Finishing Notes</p>
                          <textarea name="" id="" cols="30" rows="5"></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="grid cardCenter">
                        <div className="col-12">
                          <label htmlFor="Height ">Quantity</label>
                          <p>Files and Finishing Notes</p>
                          <InputText
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-4">
            <div className="grid">
              <div className="col-12">
                <div className="CardTest">
                  <div className="ImagesMain">
                    <img src={image2} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="CardTest order_now">
                  <h2>Order Summary</h2>
                  <div className="d-flex  mt-3">
                    <h5>Material:</h5>
                    <span> 510gsm Premium PVC</span>
                  </div>
                  <div className="d-flex ">
                    <h5>Quantity:</h5>
                    <span> 1</span>
                  </div>
                  <div className="d-flex mt-3">
                    <h5>Arrives on: </h5>
                    <span className="span_active"> Friday, 5 May.</span>
                  </div>
                  <p>
                    Receive by Thursday, 4 May. with priority delivery or
                    priority collection. Delivery options available at checkout
                  </p>
                  <p className=" mt-3">
                    Save up to 30% on large orders! Size and volume discounts
                    are applied automatically.
                  </p>
                  <button className="AddToCartBtn">Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2>PVC Banner Print Resolution</h2>
          <p>
            Our PVC banners will get your business noticed for all the right
            reasons. We print at a high quality resolution of 1440dpi to ensure
            your banner looks crisp and clear when viewed from close up as well
            as far away. Because we use eco-friendly inks that are weatherproof,
            UV-resistant, scratch and fade resistant your full-colour PVC banner
            will continue to look as vibrant as the day it arrived, even when
            used in outdoor locations. To keep your PVC banner looking its best
            wash gently using a sponge and warm soapy water.
          </p>
        </div>
        <div>
          <h2>PVC Banner Print Resolution</h2>
          <p>
            Our PVC banners will get your business noticed for all the right
            reasons. We print at a high quality resolution of 1440dpi to ensure
            your banner looks crisp and clear when viewed from close up as well
            as far away. Because we use eco-friendly inks that are weatherproof,
            UV-resistant, scratch and fade resistant your full-colour PVC banner
            will continue to look as vibrant as the day it arrived, even when
            used in outdoor locations. To keep your PVC banner looking its best
            wash gently using a sponge and warm soapy water.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
