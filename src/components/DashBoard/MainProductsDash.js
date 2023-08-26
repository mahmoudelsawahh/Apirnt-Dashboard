import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import styles from "../../styles/Tabel.module.css";
// import styles from "@/styles/pages/Dashboard/Tabel.module.css";

// import { ProductService } from "./Services/ProductService";
// import { FcApproval } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
// import { CgEye } from "react-icons/cg";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCategories,
  DeleteCategories,
  getCategories,
  UpdateCategories,
} from "../../store/CategoriesSlice";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const MainProductsDash = () => {
  // const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { Categ } = useSelector((state) => state.CategoriesSlice);
  useEffect(() => {
    if (!Categ) {
      dispatch(getCategories());
    }
  }, [Categ, dispatch]);
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
                dispatch(DeleteCategories(id))
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
    id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    // address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    // email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");

  // Global tabel Filter
  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };

  // Tabel Header
  const renderHeader2 = () => {
    return (
      <div
        className={`flex justify-content-between flex-wrap ${styles.tabel_header}`}
      >
        {/* <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue2}
            onChange={onGlobalFilterChange2}
            placeholder="Global Search"
          />
        </span> */}
        <button className={styles.addBTN} onClick={() => setVisible(true)}>
          <span className="icon-add"></span> Add New Category
        </button>
      </div>
    );
  };
  const header2 = renderHeader2();

  //  buttons

  const StateBody = (rowData) => {
    return (
      <div className={styles.TB_Content}>
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
            // console.log("Cancel");
            confirm(rowData.id);
            // dispatch(DeleteCategories(rowData.id));
          }}
        >
          <MdCancel />
        </button>
      </div>
    );
  };

  //  AddCategories
  const [name, setName] = useState("");
  const Create = () => {
    if (name.length > 0) {
      const data = {
        name,
      };
      dispatch(AddCategories(data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            showSuccess();
            setName("");
            setVisible(false);
          } else {
            res.errors.map((e) => showError(e));
          }
        });
    } else {
      showError("من فضلك ادخل الاسم");
    }
  };

  // Update
  const [id, setId] = useState(null);
  const [updateDialog, setupdateDialog] = useState(false);
  const Update = () => {
    if (name.length > 0 && id) {
      const data = {
        name,
        id,
      };
      dispatch(UpdateCategories(data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            showSuccess();
            setName("");
            setId(null);
            setupdateDialog(false);
          } else {
            res.errors.map((e) => showError(e));
          }
        });
    } else {
      showError("من فضلك ادخل الاسم");
    }
  };
  return (
    <>
      <Toast ref={toast} /> <Toast ref={toastBC} position="bottom-center" />{" "}
      <div className={styles.Tabel}>
        {/* <div className="card"> */}
        <DataTable
          // className={styles.tabelcard}
          // head
          // header={header}
          scrollable
          // scrollHeight="100vh"
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
          value={Categ}
          paginator
          // className="p-datatable-customers"
          className={`${styles.dataTabel}`}
          rows={10}
          dataKey="id"
          // filters={filters2}
          filterDisplay="row"
          responsiveLayout="scroll"
          globalFilterFields={["name", "id"]}
          header={header2}
          emptyMessage="  لا يوجد عملاء بهذه البيانات"
        >
          <Column
            // filterField="id"
            field="id"
            header="  ID"
            // filter
            // filterPlaceholder=" ID "
            style={{ minWidth: "12rem" }}
          />
          <Column
            // filterField="name"
            field="name"
            header=" Name "
            // filter
            // filterPlaceholder=" Name "
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
          <h1 className="main-two">Add New Category </h1>
          <div
            className={`grid justify-content-center align-items-center ${styles.Dialog_Div}`}
          >
            <div className="col-12 md:col-10 lg:col-10 mt-5">
              <span className="p-float-label">
                <InputText
                  className={`${name.length <= 0 ? "p-invalid" : ""}`}
                  id="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="username">Category Name</label>
              </span>
            </div>
          </div>
          <div className="flex justify-content-center align-items-center">
            <button
              className={`${styles.addBTN} mt-5`}
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
          <h1 className="main-two">Add New Category </h1>
          <div
            className={`grid justify-content-center align-items-center ${styles.Dialog_Div}`}
          >
            <div className="col-12 md:col-10 lg:col-10 mt-5">
              <span className="p-float-label">
                <InputText
                  className={`${name.length <= 0 ? "p-invalid" : ""}`}
                  id="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="username">Category Name</label>
              </span>
            </div>
          </div>
          <div className="flex justify-content-center align-items-center">
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

export default MainProductsDash;
