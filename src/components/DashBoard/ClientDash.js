import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import styles from "../../styles/Tabel.module.css";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { MdCancel } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  AddClients,
  DeleteClients,
  UpdateClients,
  getClients,
} from "../../store/HomeSlice";

import { Button } from "primereact/button";
import { Message } from "primereact/message";

const ClientDash = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { ClientsArr } = useSelector((state) => state.HomeSlice);

  useEffect(() => {
    if (!ClientsArr) {
      dispatch(getClients());
    }
  }, [ClientsArr, dispatch]);

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
                dispatch(DeleteClients(id))
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
          <span className="icon-add"></span> Add client
        </button>
      </div>
    );
  };
  const header2 = renderHeader2();

  //  buttons
  const [showImage, setShowImage] = useState(null);

  const StatusBody = (rowData) => {
    return (
      <div className={styles.TB_Content}>
        <button
          className={`${styles.TabelButton} ${styles.Edite}`}
          onClick={() => {
            setSavetype("update");
            setVisible(true);
            setId(rowData.id);
            setShowImage(rowData.image);
            setName(rowData.name);
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

  const [Id, setId] = useState(null);
  const [name, setName] = useState("");

  const [image, setImage] = useState(null);
  const Create = async () => {
    const data = {
      name,
      image,
    };

    if (Savetype === "Save") {
      if (!image || name.length <= 0) {
        // showError("برجاء ادخال جميع البيانات");
        showError("Please enter all data ");
      } else {
        dispatch(AddClients(data))
          .unwrap()
          .then((res) => {
            if (res.success) {
              showSuccess();
              Cleardialog();
              dispatch(getClients());
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
      await dispatch(UpdateClients(Data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            showSuccess();
            Cleardialog();
            dispatch(getClients());
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
    setShowImage(null);
    setImage(null);
    setId(null);
  };

  const ImageColumn = (rowData) => {
    return (
      <>
        <img
          src={rowData.image}
          alt={"client" + rowData.id}
          width={50}
          height={50}
        />
      </>
    );
  };
  return (
    <>
      <Toast ref={toast} />
      <Toast ref={toastBC} position="bottom-center" />
      <div className={styles.Tabel}>
        <DataTable
          paginator
          selectionMode="single"
          value={ClientsArr}
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
          <Column
            body={ImageColumn}
            header="Image"
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
            <div className="  card grid justify-content-center  align-items-center    ">
              <div className="col-12 md:col-6">
                <span className="p-float-label">
                  <InputText
                    className={`${name.length <= 0 ? "p-invalid" : ""}`}
                    id="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="username"> Name</label>
                </span>
              </div>

              {showImage && !image && (
                <div className="col-12  mt-5">
                  <div className="showImage">
                    <img src={showImage} alt="Update" />
                  </div>
                </div>
              )}

              <div className="col-12  mt-5">
                <div
                  className={styles.change_store_image}
                  style={{ borderColor: !image ? "red" : "#666d92" }}
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="storeImage"
                    name="storeImage"
                    accept="image/*"
                    // multiple={true}
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                  <label htmlFor="storeImage">
                    {" "}
                    <span className="icon-contact_mail"></span>
                  </label>
                  <label htmlFor="storeImage"> Click to select the image</label>
                  <label htmlFor="storeImage">Browse files</label>
                </div>
              </div>
              {image && (
                <div className="col-12 text-center">
                  <Message severity="success" text="Success Message" />
                </div>
              )}
              <div
                className="
        flex  mt-5 align-items-center justify-content-center switch col-12 md:col-6  "
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

export default ClientDash;
