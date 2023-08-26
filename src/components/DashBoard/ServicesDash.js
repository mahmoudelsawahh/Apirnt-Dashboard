import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import styles from "../../styles/Tabel.module.css";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
// import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { MdCancel } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
// import { getCategories } from "../../store/CategoriesSlice";
import {
  AddServices,
  // DeleteProduct,
  DeleteService,
  UPdateService,
  getServices,
} from "../../store/ProductsSlice";
import { getCategories } from "../../store/CategoriesSlice";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
const ServicesDash = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { ServiceArr } = useSelector((state) => state.ProductsSlice);
  const { Categ } = useSelector((state) => state.CategoriesSlice);

  useEffect(() => {
    if (!ServiceArr) {
      dispatch(getServices());
      if (!Categ) {
        dispatch(getCategories(1));
        // .unwrap()
        // .then((res) => {
        //   if (res.success) {
        //     dispatch(getServices());
        //   }
        // });
      }
      //  else {
      //   dispatch(getServices());
      // }
    }
    // ProductService.getServices().then((data) => setProducts(data));
  }, [ServiceArr, dispatch, Categ]);
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
                dispatch(DeleteService(id))
                  .unwrap()
                  .then((res) => {
                    if (res.success) {
                      dispatch(getServices());
                      clear(true);
                    } else {
                      showError("Not Success");
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
          <span className="icon-add"></span> Add Services
        </button>
      </div>
    );
  };
  const header2 = renderHeader2();
  const [showmainImage, setShowMainImage] = useState(null);
  const [showMoreImage, setShowMoreImage] = useState(null);
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
            // setMainImage(rowData.images);
            // const storeData = {
            //   id: rowData.category.id,
            //   name: rowData.category.name,
            // };
            setDescription0(rowData.description[0]);
            setDescription1(
              rowData.description[0] ? rowData.description[0] : ""
            );
            setCategory_id(rowData.category);
            setShowMainImage(rowData.images[0]);
            setShowMoreImage(rowData?.images[1]);
            setmeta_title(rowData?.meta_title);
            setmeta_description(rowData?.meta_description);
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
  const [meta_title, setmeta_title] = useState("");
  const [meta_description, setmeta_description] = useState("");
  const [description1, setDescription1] = useState("");
  const [description0, setDescription0] = useState("");
  const [category_id, setCategory_id] = useState(null);
  const [upImage, setUpImages] = useState(null);
  const [upImage1, setUpImages1] = useState(null);
  const Create = async () => {
    const data = {
      name,
      title: ["main title", "more Description"],
      description: [description0, description1],
      category_id: category_id?.id,
      images: [upImage, upImage1],
      meta_title,
      meta_description,
    };
    if (Savetype === "Save") {
      if (
        name.length > 0 &&
        description0.length > 0 &&
        upImage &&
        category_id
      ) {
        await dispatch(AddServices(data))
          .unwrap()
          .then((res) => {
            if (res.success) {
              dispatch(getServices());
              ClearData();
              showSuccess();
            } else {
              res.errors.map((e) => showError(e));
            }
          });
      } else {
        // showError("برجاء ادخال جميع البيانات و اختيار الصور");
        showError("Please enter all data ");
      }
    } else {
      const Data = {
        id: Id,
        data,
      };
      await dispatch(UPdateService(Data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            dispatch(getServices());
            ClearData();
            showSuccess();
          } else {
            res.errors.map((e) => showError(e));
          }
        });
    }
  };

  const ImagesBody = (rowData) => {
    return (
      <div className=" flex justify-content-between flex-wrap align-items-center">
        {rowData.images.map((ele, idx) => {
          return (
            <div key={idx}>
              <img src={ele} width={40} height={40} alt={rowData.name} />
            </div>
          );
        })}
      </div>
    );
  };

  // Search by Categories
  const [Savetype, setSavetype] = useState("Save");
  const ClearData = () => {
    setId(null);
    setName("");
    setDescription1("");
    setDescription0("");
    setCategory_id(null);
    setUpImages(null);
    setUpImages1(null);
    setVisible(false);
    setShowMainImage(null);
    setShowMoreImage(null);
    setmeta_title("");
    setmeta_description("");
  };
  return (
    <>
      <Toast ref={toast} />
      <Toast ref={toastBC} position="bottom-center" />
      <div className={styles.Tabel}>
        <DataTable
          paginator
          selectionMode="single"
          value={ServiceArr}
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
            field={"category.name"}
            header=" Category "
            style={{ maxWidth: "7rem" }}
          />

          <Column
            header=" Images "
            body={ImagesBody}
            style={{ maxWidth: "7rem" }}
          />
          <Column
            header=" Status "
            body={StatusBody}
            style={{ maxWidth: "7rem" }}
          />
        </DataTable>
        <Dialog
          visible={visible}
          style={{ maxWidth: "90vw" }}
          onHide={() => {
            ClearData();
          }}
        >
          <h1 className="main-two">
            {" "}
            {Savetype === "Save" ? "New Product" : "Update Product"}{" "}
          </h1>
          <form
            className={`grid justify-content-center align-items-center ${styles.Dialog_Div}`}
          >
            <div className="col-12 lg:col-6 mt-5">
              <span className="p-float-label w-full">
                <InputText
                  className={`${name.length <= 0 ? "p-invalid" : ""}`}
                  id="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="username"> Name</label>
              </span>
            </div>

            {Categ && (
              <div className="col-12 md:col-6 mt-5">
                <span className="p-float-label">
                  <Dropdown
                    id="Category"
                    value={category_id}
                    onChange={(e) => setCategory_id(e.value)}
                    options={Categ}
                    optionLabel="name"
                    placeholder="Select Category"
                    className={`${!category_id ? "p-invalid" : ""} w-full`}
                  />
                  <label htmlFor="Category">Category </label>
                </span>
              </div>
            )}
            <div className="col-12 md:col-6 mt-5">
              <span className="p-float-label w-full">
                <InputText
                  className={`${meta_title.length <= 0 ? "p-invalid" : ""}`}
                  id="usermeta_title"
                  value={meta_title}
                  onChange={(e) => setmeta_title(e.target.value)}
                />
                <label htmlFor="meta_title"> Meta Title</label>
              </span>
            </div>
            <div className="col-12 md:col-6 mt-5">
              <span className="p-float-label w-full">
                <InputText
                  className={`${
                    meta_description.length <= 0 ? "p-invalid" : ""
                  }`}
                  id="meta_description"
                  value={meta_description}
                  onChange={(e) => setmeta_description(e.target.value)}
                />
                <label htmlFor="meta_description"> Meta Descriprion</label>
              </span>
            </div>
            <div className="col-12  mt-5">
              <span className="p-float-label">
                <InputTextarea
                  id="decription"
                  value={description0}
                  className={`${description0.length <= 0 ? "p-invalid" : ""} `}
                  onChange={(e) => setDescription0(e.target.value)}
                  rows={5}
                  cols={30}
                />
                <label htmlFor="decription"> Description </label>
              </span>
            </div>
            {showmainImage && !upImage && (
              <div className="col-12  mt-5">
                <div className="showImage">
                  <img src={showmainImage} alt="Update Image" />
                </div>
              </div>
            )}
            <div className="col-12  mt-5">
              <div
                className={styles.change_store_image}
                style={{ borderColor: !upImage ? "red" : "#666d92" }}
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="storeImage"
                  name="storeImage"
                  accept="image/*"
                  // multiple={true}
                  onChange={(e) => {
                    setUpImages(e.target.files[0]);
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
            {upImage && (
              <div className="col-12 text-center">
                <Message severity="success" text="Success Message" />
              </div>
            )}
            <div className="col-12">
              <h3 className="main-two">Add More Details</h3>
            </div>

            <div className="col-12  mt-5">
              <span className="p-float-label">
                <InputTextarea
                  id="decription"
                  value={description1}
                  onChange={(e) => setDescription1(e.target.value)}
                  rows={5}
                  cols={30}
                  className={`${description1.length <= 0 ? "p-invalid" : ""} `}
                />
                <label htmlFor="decription">Description</label>
              </span>
            </div>
            {showMoreImage && !upImage1 && (
              <div className="col-12  mt-5">
                <div className="showImage">
                  <img src={showMoreImage} alt="Update Image" />
                </div>
              </div>
            )}
            <div className="col-12  mt-5">
              <div
                className={styles.change_store_image}
                style={{ borderColor: !upImage1 ? "red" : "#666d92" }}
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="storeImage2"
                  name="storeImage2"
                  accept="image/*"
                  // multiple={true}
                  onChange={(e) => {
                    setUpImages1(e.target.files[0]);
                  }}
                />
                <label htmlFor="storeImage2">
                  {" "}
                  <span className="icon-contact_mail"></span>
                </label>
                <label htmlFor="storeImage2"> Click to select the image</label>
                <label htmlFor="storeImage2">Browse files</label>
              </div>
            </div>
            {upImage1 && (
              <div className="col-12 text-center">
                <Message severity="success" text="Success Message" />
              </div>
            )}
          </form>
          <div className="flex justify-content-center align-items-center">
            <button
              className={`${styles.addBTN} mt-5 text-center`}
              onClick={() => Create()}
            >
              Save
            </button>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ServicesDash;
