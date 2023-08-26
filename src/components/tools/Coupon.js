import { generate } from "@wcj/generate-password";
// import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { useRef, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import "./Coupon.css";
import { useDispatch } from "react-redux";

import { Checkbox } from "primereact/checkbox";
import { CreateCoupon } from "../../store/HomeSlice";

const Coupon = () => {
  const dispatch = useDispatch();
  const [special, setSpecial] = useState(true);
  const [lowerCase, setLower] = useState(true);
  const [upperCase, swetUpper] = useState(true);
  const [numeric, setNumeric] = useState(true);
  const [discount, setDiscount] = useState(null);
  const [password, serPassword] = useState("");
  const [date, setDate] = useState(null);
  const Generate = () => {
    if (!special && !lowerCase && !upperCase && !numeric) {
      const Finalpassword = generate({
        length: 6,
        special: false,
        numeric: false,
        lowerCase: true,
        upperCase: false,
      });
      serPassword(Finalpassword);
    } else {
      const Finalpassword = generate({
        length: 6,
        special: special,
        numeric: numeric,
        lowerCase: lowerCase,
        upperCase: upperCase,
      });
      serPassword(Finalpassword);
    }
  };
  const ref = useRef();
  const CopyFun = () => {
    ref.current.select();
    ref.current.setSelectionRange(0, 999999999999999);
    navigator.clipboard.writeText(ref.current.value);
  };

  const SendData = async () => {
    if (password.length <= 0 || !discount || !date) {
      showError("برجاء ادخال جميع البيانات");
    } else {
      const Data = new FormData();
      Data.append("name", password);
      Data.append("discount", discount);
      Data.append("expire_at", date);
      const data = {
        name: password,
        discount,
        expire_at: date,
      };
      // console.log(data);
      await dispatch(CreateCoupon(data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            showSuccess();
            serPassword("");
            setDiscount(null);
            setDate(null);
          } else {
            showError(res.errors[0]);
          }
        });
    }
  };
  const toast = useRef(null);
  const showSuccess = (e) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "تم الاضافة بنجاح ",
      life: 3000,
    });
  };
  const showError = (e) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: e,
      life: 3000,
    });
  };
  return (
    <div className="main-container ">
      <Toast ref={toast} />
      <h2 className="main-two">Genertare Coupon</h2>
      <div className="card grid justify-content-center  align-items-center  flex-row-reverse  ">
        <div className="flex flex-row-reverse  align-items-center justify-content-start col-6 md:col-6 lg:col-3 switch">
          <Checkbox
            checked={upperCase}
            onChange={(e) => swetUpper(e.checked)}
          />
          <span>حروف كبيرة</span>
        </div>
        <div className="flex flex-row-reverse  align-items-center justify-content-start  col-6 md:col-6 lg:col-3 switch">
          <Checkbox checked={lowerCase} onChange={(e) => setLower(e.checked)} />
          <span>حروف صغيرة</span>
        </div>
        <div className="flex flex-row-reverse  align-items-center justify-content-start switch col-6 md:col-6 lg:col-2  ">
          <Checkbox checked={numeric} onChange={(e) => setNumeric(e.checked)} />
          <span> ارقام</span>
        </div>
        <div className="flex flex-row-reverse  align-items-center justify-content-start switch col-6 md:col-6 lg:col-2 ">
          <Checkbox checked={special} onChange={(e) => setSpecial(e.checked)} />
          <span> رموز</span>
        </div>
        <div
          className="
        flex flex-row-reverse  align-items-center justify-content-start switch col-12 md:col-6 lg:col-2 "
        >
          <button className="main_Btn" onClick={() => Generate()}>
            توليد
          </button>
        </div>
        <div
          className="
        flex flex-row-reverse  align-items-center justify-content-start switch col-12 md:col-6 lg:col-4 "
        >
          <div className="p-inputgroup">
            <Button onClick={CopyFun}>
              <MdContentCopy />
            </Button>
            <InputText
              maxLength={6}
              placeholder="Coupon"
              value={password}
              onChange={(e) => serPassword(e.target.value)}
              ref={ref}
            />
          </div>
        </div>
        <div
          className="
        flex flex-row-reverse  align-items-center justify-content-start switch col-12 md:col-6 lg:col-4 "
        >
          <Calendar
            value={date}
            onChange={(e) => {
              setDate(e.value.toISOString().split("T")[0]);
            }}
            // dateFormat="dd-mm-yy"
            dateFormat="yy-mm-dd"
            placeholder="End Date"
          />
        </div>
        <div
          className="
        flex flex-row-reverse  align-items-center justify-content-start switch col-12 md:col-6 lg:col-4 "
        >
          <span className="p-float-label">
            <InputNumber
              id="Discount"
              value={discount}
              onValueChange={(e) => setDiscount(e.value)}
            />
            <label htmlFor="Discount">Discount</label>
          </span>
        </div>
        <div
          className="
        flex flex-row-reverse  align-items-center justify-content-start switch col-12 md:col-6 lg:col-4 "
        >
          <button className="main_Btn" onClick={() => SendData()}>
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
