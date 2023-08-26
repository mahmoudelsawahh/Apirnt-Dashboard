import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import styles from "../../styles/Tabel.module.css";
import { MdCancel } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
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
import { Message } from "primereact/message";
import { InputTextarea } from "primereact/inputtextarea";

const CategoriesDash = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { Categ } = useSelector((state) => state.CategoriesSlice);
  useEffect(() => {
    if (!Categ) {
      dispatch(getCategories(1));
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
                      dispatch(getCategories(1));
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

  // Tabel Header
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
            setVisible(true);
            setName(rowData.name);
            setId(rowData.id);
            setShowImage(rowData.image);
            setDescription(rowData.description);
            setTitle(rowData.title);
            setSavetype("update");
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
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [Id, setId] = useState(null);
  const [showImage, setShowImage] = useState(null);

  const Create = async () => {
    const data = {
      name,
      image,
      title,
      description,
      owner_type: 1,
    };

    if (Savetype === "Save") {
      if (!image || name.length <= 0) {
        // showError("برجاء ادخال جميع البيانات");
        showError("Please enter all data ");
      } else {
        dispatch(AddCategories(data))
          .unwrap()
          .then((res) => {
            if (res.success) {
              showSuccess();
              Cleardialog();
              const data = {
                owner_type: 1,
              };
              dispatch(getCategories(1));
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
      await dispatch(UpdateCategories(Data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            showSuccess();
            Cleardialog();

            dispatch(getCategories(1));
          } else {
            res.errors.map((e) => showError(e));
          }
        });
    }
  };

  const ImageCloumn = (rowData) => {
    return (
      <>
        <img src={rowData.image} alt={rowData.name} width={50} height={50} />
      </>
    );
  };

  const [Savetype, setSavetype] = useState("Save");
  const Cleardialog = () => {
    setVisible(false);
    setImage(null);
    setName("");
    setTitle("");
    setDescription("");
    setId(null);
    setImage(null);
    setShowImage(null);
  };
  return (
    <>
      <Toast ref={toast} /> <Toast ref={toastBC} position="bottom-center" />{" "}
      <div className={styles.Tabel}>
        <DataTable
          scrollable
          selectionMode="single"
          value={Categ}
          paginator
          className={`${styles.dataTabel}`}
          rows={10}
          dataKey="id"
          filterDisplay="row"
          responsiveLayout="scroll"
          header={header2}
          emptyMessage="  لا يوجد عملاء بهذه البيانات"
        >
          <Column field="name" header=" Name " style={{ minWidth: "12rem" }} />
          <Column
            field="description"
            header=" Description "
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="count"
            header=" Count "
            style={{ minWidth: "12rem" }}
          />
          <Column
            body={ImageCloumn}
            header=" Image "
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
          style={{ maxWidth: "90vw" }}
          onHide={() => {
            Cleardialog();
          }}
        >
          <h1 className="main-two">
            {" "}
            {Savetype === "Save"
              ? "Add Services category"
              : "Update Services category"}{" "}
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
              <div className="col-12 md:col-6">
                <span className="p-float-label">
                  <InputText
                    className={`${title.length <= 0 ? "p-invalid" : ""}`}
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label htmlFor="title"> Title</label>
                </span>
              </div>
              <div className="col-12">
                <span className="p-float-label">
                  <InputTextarea
                    cols={20}
                    rows={2}
                    className={`${description.length <= 0 ? "p-invalid" : ""}`}
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label htmlFor="description"> Description</label>
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

export default CategoriesDash;
