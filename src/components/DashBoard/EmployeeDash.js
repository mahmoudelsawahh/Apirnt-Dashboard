import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import styles from "../../styles/Tabel.module.css";
// import styles from "@/styles/pages/Dashboard/Tabel.module.css";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
// import { ProductService } from "./Services/ProductService";
// import { FcApproval } from "react-icons/fc";
import { Password } from "primereact/password";
import { MdCancel } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { CgEye } from "react-icons/cg";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  AddEmployees,
  DeleteEmployees,
  getEmployees,
  UpdateEmployees,
} from "../../store/EmployeesSlice";
import Cookies from "js-cookie";

const EmployeeDash = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { empolyees } = useSelector((state) => state.EmployeesSlice);
  useEffect(() => {
    if (!empolyees) {
      dispatch(getEmployees());
    }
    // ProductService.getProducts().then((data) => setProducts(data));
  }, [empolyees, dispatch]);
  const toast = useRef(null);
  const toastBC = useRef(null);
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
                dispatch(DeleteEmployees(id))
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

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    employeeable_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },

    // address: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");

  //   Global tabel Filter
  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };

  //   Tabel Header
  const renderHeader2 = () => {
    return (
      <div
        className={`flex justify-content-between flex-wrap ${styles.tabel_header}`}
      >
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue2}
            onChange={onGlobalFilterChange2}
            placeholder="Global Search"
          />
        </span>
        <button className={styles.addBTN} onClick={() => setVisible(true)}>
          <span className="icon-add"></span> Add Employee
        </button>
      </div>
    );
  };
  const header2 = renderHeader2();

  //  buttons
  const StateBody = (rowData) => {
    return (
      <div className={styles.TB_Content}>
        {/* <button
          className={`${styles.TabelButton} ${styles.Edite}`}
        >
          <CgEye />
        </button> */}
        {/* <button
          className={`${styles.TabelButton} ${styles.approve}`}
          onClick={() => {
            console.log("approve");
          }}
        >
          <FcApproval />
        </button> */}

        <button
          className={`${styles.TabelButton} ${styles.Edite}`}
          onClick={() => {
            setupdateDialog(true);
            setName(rowData.name);
            setId(rowData.id);
          }}
        >
          <AiFillEdit />
        </button>
        <button
          className={`${styles.TabelButton} ${styles.Cancel}`}
          onClick={() => {
            confirm(rowData.id);
            // dispatch(DeleteEmployees(rowData.id));
          }}
        >
          <MdCancel />
        </button>
      </div>
    );
  };

  // Add
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setcoCfirmPass] = useState("");
  const Create = () => {
    if (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPass.length > 0 &&
      Cookies.get("StoreToken")
    ) {
      const data = {
        name,
        email,
        password,
        password_confirmation: confirmPass,
        // token:Cookies.get("StoreToken")
      };
      dispatch(AddEmployees(data))
        .unwrap()
        .then((res) => {
          if (!res.data || !res.success) {
            console.log(res.errors);
            res.errors.map((ele) => showError(ele));
          } else {
            showSuccess();
            setName("");
            setEmail("");
            setPassword("");
            setcoCfirmPass("");
            setVisible(false);
          }
        });
    } else {
      // showError("برجاء ادخال جميع البيانات");
      showError("Please enter all data ");
    }
  };

  // Update
  const [id, setId] = useState(null);
  const [updateDialog, setupdateDialog] = useState(false);
  const Update = () => {
    if (name.length > 0 && id && Cookies.get("StoreToken")) {
      const data = {
        name,
        id,
        // token: Cookies.get("StoreToken")
      };
      dispatch(UpdateEmployees(data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            showSuccess();
            setName("");
            setId(null);
            setupdateDialog(false);
          } else {
            res.errors.map((ele) => showError(ele));
          }
        });
    } else {
      // showError("برجاء ادخال الاسم ");
      showError("Please enter the name ");
    }
  };
  return (
    <>
      <Toast ref={toast} /> <Toast ref={toastBC} position="bottom-center" />
      <div className={styles.Tabel}>
        {/* <div className="card"> */}
        <DataTable
          // head
          // header={header}
          scrollable
          scrollHeight="100vh"
          selectionMode="single"
          selection={selectedProduct1}
          // onSelectionChange={(e) => {
          //   setSelectedCats(e.value);
          //   setSelectedProduct1(e.value);
          //   setNameUpdate(e.value.name);
          //   setOrderUpdate(e.value.ord);
          //   setparentIDUpdate(e.value.parentId);
          //   setID(e.value.id);
          //   setUpdateImage1(e.value.activeIcon);
          //   setUpdateImage2(e.value.disabledIcon);
          //   // const [updateImage2, setUpdateImage2] = useState("");
          // }}
          tableStyle={{ minWidth: "50rem" }}
          value={empolyees}
          paginator
          // className="p-datatable-customers"
          className={`${styles.dataTabel}`}
          rows={10}
          dataKey="id"
          filters={filters2}
          filterDisplay="row"
          responsiveLayout="scroll"
          globalFilterFields={["name", "Id", "email"]}
          header={header2}
          emptyMessage="  لا يوجد عملاء بهذه البيانات"
        >
          <Column
            filterField="id"
            field="id"
            header="ID"
            filter
            filterPlaceholder=" ID "
            style={{ minWidth: "12rem" }}
          />
          <Column
            filterField="name"
            field="name"
            header=" Name "
            filter
            filterPlaceholder=" Name "
            style={{ minWidth: "12rem" }}
          />
          <Column
            filterField="email"
            field="email"
            header=" Email "
            filter
            filterPlaceholder=" Email "
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="Status"
            body={StateBody}
            style={{ minWidth: "12rem" }}
          />
        </DataTable>
        <Dialog
          visible={visible}
          style={{ minWidth: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <h1 className="main-two">Add Employee </h1>
          <div
            className={`grid justify-content-center align-items-center ${styles.Dialog_Div}`}
          >
            <div className="col-12 md:col-6 lg:col-6 mt-5">
              <span className="p-float-label w-full">
                <InputText
                  className={`${name.length <= 0 ? "p-invalid" : ""} w-full`}
                  id="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="username"> Name</label>
              </span>
            </div>
            <div className="col-12 md:col-6 lg:col-6 mt-5">
              <span className="p-float-label w-full">
                <InputText
                  id="email"
                  type={"email"}
                  className={`${email.length <= 0 ? "p-invalid" : ""} w-full`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </span>
            </div>
            <div className="col-12 md:col-6 lg:col-6 mt-5">
              <span className="p-float-label w-full">
                <Password
                  id="password"
                  className={`${
                    password.length <= 0 ? "p-invalid" : ""
                  } w-full`}
                  // className={" w-full"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  toggleMask
                />
                <label htmlFor="password">Password</label>
              </span>
            </div>
            <div className="col-12 md:col-6 lg:col-6 mt-5">
              <span className="p-float-label w-full">
                <Password
                  id="confrim"
                  className={`${
                    confirmPass.length <= 0 || confirmPass !== password
                      ? "p-invalid"
                      : ""
                  } w-full`}
                  value={confirmPass}
                  onChange={(e) => setcoCfirmPass(e.target.value)}
                  toggleMask
                />
                <label htmlFor="confrim">Confirm Password</label>
              </span>
            </div>
          </div>
          <div className="flex justify-content-center align-items-center">
            <button
              className={`${styles.addBTN} mt-5 text-center`}
              onClick={() => Create()}
            >
              Save
            </button>
          </div>
        </Dialog>
        <Dialog
          visible={updateDialog}
          style={{ minWidth: "50vw" }}
          onHide={() => {
            setupdateDialog(false);
            setName("");
            setId(null);
          }}
        >
          <h1 className="main-two">Update Employee </h1>
          <div
            className={`flex justify-content-center align-items-center flex-column ${styles.Dialog_Div}}`}
          >
            <span className="p-float-label mt-5 w-full">
              <InputText
                // className="w-full"
                className={`${name.length <= 0 ? "p-invalid" : ""} w-full`}
                id="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="username">Category Name</label>
            </span>
            <button
              className={`${styles.addBTN} mt-5`}
              onClick={() => Update()}
            >
              Update
            </button>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default EmployeeDash;
