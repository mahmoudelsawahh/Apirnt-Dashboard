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
import { Message } from "primereact/message";
import { AddAds, DeleteAds, UpdateAds, getAds } from "../../store/HomeSlice";

import { Button } from "primereact/button";

const AddsDash = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { AdsAsarr } = useSelector((state) => state.HomeSlice);

  useEffect(() => {
    if (!AdsAsarr) {
      dispatch(getAds());
    }
  }, [AdsAsarr, dispatch]);

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
                dispatch(DeleteAds(id))
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
          <span className="icon-add"></span> Add Ads
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
            setPrice(rowData.price);
            setUrl(rowData.url);
            setShowImage(rowData.image);
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
  const [showImage, setShowImage] = useState(null);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const Create = async () => {
    const data = {
      name,
      image,
      price,
      url,
    };
    if (Savetype === "Save") {
      if (!image || name.length <= 0 || price.length <= 0 || url.length <= 0) {
        // showError("برجاء ادخال جميع البيانات");
        showError("Please enter all data ");
      } else {
        dispatch(AddAds(data))
          .unwrap()
          .then((res) => {
            if (res.success) {
              showSuccess();
              Cleardialog();
              dispatch(getAds());
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
      await dispatch(UpdateAds(Data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            showSuccess();
            Cleardialog();
            dispatch(getAds());
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
    setPrice("");
    setUrl("");
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
          value={AdsAsarr}
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
          <Column field="id" header=" ID " style={{ maxWidth: "7rem" }} />
          <Column field="name" header=" Name " style={{ maxWidth: "7rem" }} />
          <Column field="price" header=" Price " style={{ maxWidth: "7rem" }} />
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
            {Savetype === "Save" ? "Genertare Ads" : "Update Ads"}{" "}
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
                  <label htmlFor="username">Title</label>
                </span>
              </div>
              <div className="col-12 md:col-6">
                <span className="p-float-label">
                  <InputText
                    keyfilter={"int"}
                    className={`${price.length <= 0 ? "p-invalid" : ""}`}
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label htmlFor="price">Price</label>
                </span>
              </div>
              <div className="col-12">
                <span className="p-float-label">
                  <InputText
                    className={`${url.length <= 0 ? "p-invalid" : ""}`}
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <label htmlFor="url"> URL</label>
                </span>
              </div>
              {showImage && !image && (
                <div className="col-12  mt-5">
                  <div className="showImage">
                    <img src={showImage} alt="Update Image" />
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

export default AddsDash;
