import Cookies from "js-cookie";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../store/AuthSlice";
// import Form from "react-bootstrap/Form";
import "./login.css";
import { useFormik } from "formik";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const EMptyInput = (mess) => {
    toast.current.show({
      severity: "error",
      summary: `${mess}`,
      life: 3000,
    });
  };

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Successfully logged in",
      detail: formik.values.value,
    });
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.email) {
        errors.email = " Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email";
      }
      if (!data.password) {
        errors.password = "Password is required.";
      }
      return errors;
    },
    onSubmit: (data) => {
      // Cookies.set(
      //   "Aprint_Dash_Token",
      //   "43|0kDAsHzoqKlZxmjzcLmOYr4o2rp2r28jP60B0WI1"
      // );
      // navigate("/", { replace: true });

      if (data) {
        dispatch(getLogin(data))
          .unwrap()
          .then((res) => {
            if (res.success === false) {
              res.errors.map((ele) => {
                return EMptyInput(ele);
              });
            } else {
              show();
              Cookies.set("Aprint_Dash_Token", res.data.token);
              // Cookies.set("Aprint_dash_userInfo", res.data);

              // 43|0kDAsHzoqKlZxmjzcLmOYr4o2rp2r28jP60B0WI1
              formik.resetForm();
              navigate("/", { replace: true });
            }
          });
      }
    },
  });

  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };
  return (
    <>
      <Toast ref={toast} />
      <div className="LoginPage">
        <div className="container">
          <div className=" grid justify-content-center align-items-center">
            <div className="col-12 md:col-5 Login-card">
              <h1 className="text-center main-title"> Apirnt Dashboard </h1>
              <form onSubmit={formik.handleSubmit} className="grid  gap-2">
                <div className="col-12">
                  <div className="inputFormik">
                    <label htmlFor="email">Email </label>
                    <InputText
                      name="email"
                      className={classNames({
                        "p-invalid": isFormFieldInvalid("email"),
                      })}
                      value={formik.values.email}
                      onChange={(e) => {
                        formik.setFieldValue("email", e.target.value);
                      }}
                    />
                    {getFormErrorMessage("email")}
                  </div>
                </div>
                <div className="col-12">
                  <div className="inputFormik">
                    <label htmlFor="password"> password</label>
                    <Password
                      toggleMask
                      name="password"
                      className={`${classNames({
                        "p-invalid": isFormFieldInvalid("password"),
                      })} w-full `}
                      value={formik.values.password}
                      feedback={false}
                      onChange={(e) => {
                        formik.setFieldValue("password", e.target.value);
                      }}
                    />
                    {getFormErrorMessage("password")}
                  </div>
                </div>
                <button name="login" type="submit" className="submit-button">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
