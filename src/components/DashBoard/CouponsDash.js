import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import styles from "../../styles/Tabel.module.css";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";
import { MdCancel, MdContentCopy } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCoupon,
  DeleteCoupon,
  UpdateCoupon,
  getCoupon,
} from "../../store/HomeSlice";
import { generate } from "@wcj/generate-password";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
const CouponsDash = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { couponArr } = useSelector((state) => state.HomeSlice);

  useEffect(() => {
    if (!couponArr) {
      dispatch(getCoupon());
    }
  }, [couponArr, dispatch]);

  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Saved successfully",
      life: 3000,
    });
  };

  const showError = (e) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: `${e}`,
      life: 3000,
    });
  };
  const toastBC = useRef(null);

  const clear = (submit) => {
    toastBC.current.clear();
    submit && showSuccess();
  };
  const confirm = (id) => {
    toastBC.current.show({
      severity: "info",
      sticky: true,
      className: "border-none",
      content: (
        <div
          className="flex flex-column align-items-center"
          style={{ flex: "1" }}
        >
          <div className="text-center">
            <i
              className="pi pi-exclamation-triangle"
              style={{ fontSize: "3rem" }}
            ></i>
            <div className="font-bold text-xl my-3">Are you sure?</div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={(e) => {
                dispatch(DeleteCoupon(id))
                  .unwrap()
                  .then((res) => {
                    if (res.success) {
                      clear(true);
                    }
                  });
              }}
              type="button"
              label="Confirm"
              className="p-button-success w-6rem"
            />
            <Button
              onClick={(e) => clear(false)}
              type="button"
              label="Cancel"
              className="p-button-warning w-6rem"
            />
          </div>
        </div>
      ),
    });
  };
  //   Tabel Header
  const renderHeader2 = () => {
    return (
      <div
        className={`flex justify-content-between flex-wrap ${styles.tabel_header}`}
      >
        <button
          className={styles.addBTN}
          onClick={() => {
            setVisible(true);
            setSavetype("Save");
          }}
        >
          <span className="icon-add"></span> Add Coupon
        </button>
      </div>
    );
  };
  const header2 = renderHeader2();

  //  buttons

  const StatusBody = (rowData) => {
    return (
      <div className={styles.TB_Content}>
        <button
          className={`${styles.TabelButton} ${styles.Edite}`}
          onClick={() => {
            setSavetype("update");
            setVisible(true);
            setId(rowData.id);
            setName(rowData.name);
            setDiscount(rowData.percentage);
            setCode(rowData.code);
            setStart_at(rowData.start_at);
            setEnd_at(rowData.end_at);
          }}
        >
          <AiFillEdit />
        </button>
        <button
          className={`${styles.TabelButton} ${styles.Cancel}`}
          onClick={() => {
            confirm(rowData.id);
          }}
        >
          <MdCancel />
        </button>
      </div>
    );
  };

  //  AddCategories
  const [start_at, setStart_at] = useState(null);
  const [end_at, setEnd_at] = useState(null);
  const [Id, setId] = useState(null);
  const [name, setName] = useState("");
  const [special, setSpecial] = useState(true);
  const [lowerCase, setLower] = useState(true);
  const [upperCase, swetUpper] = useState(true);
  const [numeric, setNumeric] = useState(true);
  const [discount, setDiscount] = useState(null);
  const [code, setCode] = useState("");

  const Create = async () => {
    const data = {
      name: code,
      discount,
      expire_at: end_at.toISOString().split("T")[0],
    };
    if (Savetype === "Save") {
      if (!discount || !end_at || code.length <= 0) {
        // showError("برجاء ادخال جميع البيانات");
        showError("Please enter all data ");
      } else {
        dispatch(CreateCoupon(data))
          .unwrap()
          .then((res) => {
            if (res.success) {
              showSuccess();
              Cleardialog();
              dispatch(getCoupon());
            } else {
              showError(res.errors[0]);
            }
          });
      }
    } else {
      const Data = {
        id: Id,
        data,
      };
      await dispatch(UpdateCoupon(Data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            showSuccess();
            Cleardialog();
            dispatch(getCoupon());
          } else {
            res.errors.map((e) => showError(e));
          }
        });
    }
  };

  // Search by Categories
  const [Savetype, setSavetype] = useState("Save");

  const Cleardialog = () => {
    setName("");
    setVisible(false);
    setDiscount(null);
    setStart_at(null);
    setEnd_at(null);
    setId(null);
    setCode("");
  };

  const Generate = () => {
    if (!special && !lowerCase && !upperCase && !numeric) {
      const Finalpassword = generate({
        length: 6,
        special: false,
        numeric: false,
        lowerCase: true,
        upperCase: false,
      });
      setCode(Finalpassword);
    } else {
      const Finalpassword = generate({
        length: 6,
        special: special,
        numeric: numeric,
        lowerCase: lowerCase,
        upperCase: upperCase,
      });
      setCode(Finalpassword);
    }
  };
  const ref = useRef();
  const CopyFun = () => {
    ref.current.select();
    ref.current.setSelectionRange(0, 999999999999999);
    navigator.clipboard.writeText(ref.current.value);
  };

  return (
    <>
      <Toast ref={toast} />
      <Toast ref={toastBC} position="bottom-center" />
      <div className={styles.Tabel}>
        <DataTable
          paginator
          selectionMode="single"
          value={couponArr}
          className={`${styles.dataTabel}`}
          dataKey="id"
          scrollable
          scrollHeight="100vh"
          filterDisplay="row"
          responsiveLayout="scroll"
          tableStyle={{ minWidth: "50rem" }}
          header={header2}
          rows={10}
        >
          <Column field="name" header=" Name " style={{ maxWidth: "7rem" }} />
          {/* <Column field="code" header=" Code " style={{ maxWidth: "7rem" }} />
          <Column
            field="percentage"
            header=" Percentage "
            style={{ maxWidth: "7rem" }}
          /> */}
          <Column
            field="discount"
            header="Discount "
            style={{ maxWidth: "7rem" }}
          />
          <Column
            field="expire_at"
            header=" End at "
            style={{ maxWidth: "7rem" }}
          />
          <Column
            // field="store_id"
            header=" Status "
            body={StatusBody}
            style={{ maxWidth: "7rem" }}
          />
        </DataTable>
        <Dialog
          visible={visible}
          style={{ maxWidth: "90vw" }}
          onHide={() => {
            Cleardialog();
          }}
        >
          <h1 className="main-two">
            {" "}
            {Savetype === "Save" ? "Genertare Coupon" : "Update Coupon"}{" "}
          </h1>

          <div className="main-container ">
            <Toast ref={toast} />
            <div className="  card grid justify-content-center  align-items-center    ">
              <div className="flex  flex-row-reverse  mt-5 align-items-center justify-content-center col-6 md:col-6 lg:col-3 switch">
                <Checkbox
                  checked={upperCase}
                  onChange={(e) => swetUpper(e.checked)}
                />
                <span> Larg letters</span>
              </div>
              <div className="flex  flex-row-reverse  mt-5 align-items-center justify-content-center  col-6 md:col-6 lg:col-3 switch">
                <Checkbox
                  checked={lowerCase}
                  onChange={(e) => setLower(e.checked)}
                />
                <span> Small letters</span>
              </div>
              <div className="flex  flex-row-reverse  mt-5 align-items-center justify-content-center switch col-6 md:col-6 lg:col-3  ">
                <Checkbox
                  checked={numeric}
                  onChange={(e) => setNumeric(e.checked)}
                />
                <span> Number</span>
              </div>
              <div className="flex  flex-row-reverse  mt-5 align-items-center justify-content-center switch col-6 md:col-6 lg:col-3 ">
                <Checkbox
                  checked={special}
                  onChange={(e) => setSpecial(e.checked)}
                />
                <span> symbols</span>
              </div>

              <div
                className="
        flex  mt-5 align-items-center justify-content-center switch col-12 md:col-6  "
              >
                <div className="p-inputgroup">
                  <Button onClick={CopyFun}>
                    <MdContentCopy />
                  </Button>
                  <InputText
                    maxLength={6}
                    placeholder="Coupon Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    ref={ref}
                  />
                </div>
              </div>
              <div
                className="
        flex  mt-5 align-items-center justify-content-start switch col-12 md:col-6 "
              >
                <button className="main_Btn" onClick={() => Generate()}>
                  Generate
                </button>
              </div>

              <div
                className="
        flex  mt-5 align-items-center justify-content-start switch col-12 md:col-6  "
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
        flex  mt-5 align-items-center justify-content-start switch col-12 md:col-6  "
              >
                <Calendar
                  value={end_at}
                  onChange={(e) => {
                    setEnd_at(e.value);
                    // setEnd_at(e.value.toISOString().split("T")[0]);
                  }}
                  // dateFormat="dd-mm-yy"
                  dateFormat="yy-mm-dd"
                  placeholder="End Date"
                />
              </div>

              <div
                className="
        flex  mt-5 align-items-center justify-content-start switch col-12 md:col-6  "
              >
                <button className="main_Btn" onClick={() => Create()}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default CouponsDash;
