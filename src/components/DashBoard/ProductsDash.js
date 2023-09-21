import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import styles from "../../styles/Tabel.module.css";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { MdCancel } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { Chips } from "primereact/chips";
// import { getProductsCategories } from "../../store/CategoriesSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  // AddFooter,
  AddHeader,
  AddNestedOfOptions,
  AddOptions,
  AddProduct,
  AddSection,
  DeleteHeader,
  DeleteOptions,
  DeleteProduct,
  DeleteSection,
  // Deletefooter,
  UPdateProduct,
  UpdateFooter,
  UpdateOptions,
  getOneProduct,
  getProducts,
} from "../../store/ProductsSlice";
import { getProductsCategories } from "../../store/CategoriesSlice";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { CgEye } from "react-icons/cg";
import { InputNumber } from "primereact/inputnumber";
import Cookies from "js-cookie";
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ direction: "rtl" }, { direction: "ltr" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [
      {
        indent: "-1",
      },
      {
        indent: "+1",
      },
    ],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    ["link", "image", "video"],
  ],
};
const ProductsDash = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { Products } = useSelector((state) => state.ProductsSlice);
  const { proCateg } = useSelector((state) => state.CategoriesSlice);
  const [OptionsNum , setOptionsNum] = useState(0)
  useEffect(() => {
    if (!Products) {
      dispatch(getProducts());
    }
  }, [Products, dispatch]);
  useEffect(() => {
    if (!proCateg) {
      dispatch(getProductsCategories(2));
    }
  }, [dispatch, proCateg]);
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
                dispatch(DeleteProduct(id))
                  .unwrap()
                  .then((res) => {
                    if (res.success) {
                      dispatch(getProducts());
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
          <span className="icon-add"></span> Add Product
        </button>
      </div>
    );
  };
  const header2 = renderHeader2();
  const [showmainImage, setShowMainImage] = useState(null);
  // const [showMoreImage, setShowMoreImage] = useState(null);
  //  buttons

  const StatusBody = (rowData) => {
    return (
      <div className={styles.TB_Content}>
        <button
          className={`${styles.TabelButton} ${styles.Edite}`}
          onClick={() => {
            setSavetype("update");
            setVisible(true);
            setPrice(rowData.price);
            setId(rowData.id);
            setName(rowData.title);
            setDescription0(rowData.description);
            setCategory_id(rowData.category);
            setShowMainImage(rowData.images);
            Setmax_width(rowData.max_width);
            Setmin_width(rowData.min_width);
            Setmax_height(rowData.max_height);
            Setmin_height(rowData.min_height);
            Setdef_width(rowData.def_width);
            Setdef_height(rowData.def_height);
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

  //  addProduct
  const [Id, setId] = useState(null);
  const [name, setName] = useState("");
  const [meta_title, setmeta_title] = useState("");
  const [meta_description, setmeta_description] = useState("");
  const [description0, setDescription0] = useState("");
  const [category_id, setCategory_id] = useState(null);
  const [upImage, setUpImages] = useState(null);
  const [price, setPrice] = useState(null);
  const [max_width, Setmax_width] = useState(null);
  const [min_width, Setmin_width] = useState(null);
  const [max_height, Setmax_height] = useState(null);
  const [min_height, Setmin_height] = useState(null);
  const [def_width, Setdef_width] = useState(null);
  const [def_height, Setdef_height] = useState(null);
  const Create = async () => {
    const data = {
      title: name,
      description: description0,
      category_id: category_id?.id,
      images: upImage,
      price,
      max_width,
      min_width,
      max_height,
      min_height,
      def_width,
      def_height,
      meta_title,
      meta_description,
    };
    if (Savetype === "Save") {
      if (
        name.length > 0 &&
        description0.length > 0 &&
        upImage &&
        category_id &&
        price &&
        max_width &&
        min_width &&
        max_height &&
        min_height &&
        def_width &&
        meta_title.length > 0 &&
        meta_description.length > 0 &&
        def_height
      ) {
        await dispatch(AddProduct(data))
          .unwrap()
          .then((res) => {
            if (res.success) {
              dispatch(getProducts())
                .unwrap()
                .then(() => {
                  ClearData();
                  showSuccess();
                });
            } else {
              res.errors.map((e) => showError(e));
            }
          });
      } else {
        showError("Please enter all data ");
      }
    } else {
      const Data = {
        id: Id,
        data,
      };
      await dispatch(UPdateProduct(Data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            dispatch(getProducts());
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
        {rowData.images.map((ele) => {
          return (
            <div key={ele}>
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
    setDescription0("");
    setCategory_id(null);
    setUpImages(null);
    setVisible(false);
    setShowMainImage(null);
    setPrice(null);
    Setmax_width(null);
    Setmin_width(null);
    Setmax_height(null);
    Setmin_height(null);
    Setdef_width(null);
    Setdef_height(null);
    setmeta_title("");
    setmeta_description("");
    setOptionsNum(0)
  };

  // ProductID
  const [ProductID, setProductId] = useState(null);
  // State Header
  const [HeaderDialog, setHeadrDialog] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const [Headerdescription, setHeaderDescription] = useState("");
  const [headerLines, setHeaderLines] = useState([]);
  const [HeaderTabel, setHeaderTabel] = useState([]);
  const CleaderHeaders = () => {
    setHeadrDialog(false);
    setHeaderTitle("");
    setHeaderDescription("");
    setHeaderLines([]);
    setHeaderTabel([]);
    setProductId(null);
  };
  const HeaderBody = (rowData) => {
    return (
      <div className={styles.TB_Content} style={{ justifyContent: "center" }}>
        <button
          className={`${styles.TabelButton} ${styles.Edite}`}
          onClick={() => {
            dispatch(getOneProduct(rowData.id))
              .unwrap()
              .then((res) => {
                if (res.data.headers) {
                  setHeaderTabel([...res.data.headers]);
                }
                setProductId(res.data.id);
                setHeadrDialog(true);
              });
          }}
        >
          <CgEye />
        </button>
      </div>
    );
  };

  const LinesBody = (rowData) => {
    return (
      <div className=" flex justify-content-center flex-wrap align-content-center">
        {rowData.lines?.map((ele) => {
          return (
            <p className="Liens-tabel" key={`${ele}`}>
              {ele}
            </p>
          );
        })}
      </div>
    );
  };

  const HeaderStatusBody = (rowData) => {
    return (
      <div className={styles.TB_Content} style={{ justifyContent: "center" }}>
        <button
          className={`${styles.TabelButton} ${styles.Cancel}`}
          onClick={() => {
            dispatch(DeleteHeader(rowData.id))
              .unwrap()
              .then((res) => {
                if (res.success) {
                  showSuccess();
                  CleaderHeaders();
                } else {
                  showError("Some thing went wrong");
                }
              });
          }}
        >
          <MdCancel />
        </button>
      </div>
    );
  };

  const Createheader = () => {
    if (headerTitle.length <= 0 || Headerdescription.length <= 0) {
      showError("Please fill All Data");
    } else {
      const data = {
        title: headerTitle,
        description: Headerdescription,
        lines: headerLines,
        product_id: ProductID,
      };

      dispatch(AddHeader(data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            showSuccess();
            CleaderHeaders();
          } else {
            showError("Some thing went wrong");
          }
        });
    }
  };

  // FooterBody

  // State Header
  const [FooterDialog, setFooterDialog] = useState(false);
  const [Footerdescription, setFooterDescription] = useState("");
  const [footer_id, setFooter_id] = useState(null);

  const CleaderFooters = () => {
    setFooterDialog(false);
    setFooterDescription("");
    setFooter_id(null);
    setProductId(null);
  };
  const FooterBody = (rowData) => {
    return (
      <div className={styles.TB_Content} style={{ justifyContent: "center" }}>
        <button
          className={`${styles.TabelButton} ${styles.Edite}`}
          onClick={() => {
            dispatch(getOneProduct(rowData.id))
              .unwrap()
              .then((res) => {
                if (res.data.footers) {
                  // setFooterTabel([...res.data.footers]);
                  setFooter_id(res.data.footers.id);
                  setFooterDescription(res.data.footers.description);
                }
                setProductId(res.data.id);
                setFooterDialog(true);
              });
          }}
        >
          <CgEye />
        </button>
      </div>
    );
  };

  const CreateFooter = () => {
    if (Footerdescription.length <= 0 || !footer_id) {
      showError("Please fill All Data");
    } else {
      const Data = {
        id: footer_id,
        data: {
          description: Footerdescription,
        },
      };

      dispatch(UpdateFooter(Data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            showSuccess();
            CleaderFooters();
          } else {
            showError("Some thing went wrong");
          }
        });
    }
  };

  // SectionsBody
  const [SectionDialog, setSectionDialog] = useState(false);
  const [SectionTitle, setSectionTitle] = useState("");
  const [SectionOrder, setSectionOrder] = useState("1");
  const [SectionTabel, setSectionTabel] = useState([]);
  const CleaderSections = () => {
    setSectionDialog(false);
    setSectionTitle("");
    setSectionOrder("1");
    setSectionTabel([]);
    setProductId(null);
    setSelectOption(null)
    setAddNestedOfOption(false)
    setOptionsNum(0)


  };
  const SectionsBody = (rowData) => {
    return (
      <div className={styles.TB_Content} style={{ justifyContent: "center" }}>
        <button
          className={`${styles.TabelButton} ${styles.Edite}`}
          onClick={() => {
            dispatch(getOneProduct(rowData.id))
              .unwrap()
              .then((res) => {
                if (res.data.sections) {
                  setSectionTabel([...res.data.sections]);
                }
                setProductId(res.data.id);
                setSectionDialog(true);
              });
          }}
        >
          <CgEye />
        </button>
      </div>
    );
  };
  // SectionStatusBody

  const SectionStatusBody = (rowData) => {
    return (
      <div className={styles.TB_Content} style={{ justifyContent: "center" }}>
        <button
          className={`${styles.TabelButton} ${styles.Cancel}`}
          onClick={() => {
            dispatch(DeleteSection(rowData.id))
              .unwrap()
              .then((res) => {
                if (res.success) {
                  showSuccess();
                  CleaderSections();
                } else {
                  showError("Some thing went wrong");
                }
              });
          }}
        >
          <MdCancel />
        </button>
      </div>
    );
  };

  const CreateSection = () => {
    if (SectionTitle.length <= 0 || SectionOrder.length <= 0) {
      showError("Please fill All Data");
    } else {
      const data = {
        name: SectionTitle,
        type: 2,
        // type: SectionType.id,
        order: SectionOrder,
        product_id: ProductID,
      };

      dispatch(AddSection(data))
        .unwrap()
        .then((res) => {
          if (res.success) {
            showSuccess();
            CleaderSections();
          } else {
            showError("Some thing went wrong");
          }
        });
    }
  };

  // OptionBody

  const [OptionDialog, setOptionDialog] = useState(false);
  const [OptionTitle, setOptionTitle] = useState("");
  const [OptionPrice, setOptionPrice] = useState(0);
  const [OptionDescription, setOptionDescription] = useState("");
  const [OptionImage, setOptionImage] = useState(null);
  const [OptionTabel, setOptionTabel] = useState([]);
  const [Section_id, setSection_id] = useState(null);
  const [option_type, setOption_type] = useState(null);
  const [SelectOption , setSelectOption] = useState(null)
  const [AddNestedOfOption , setAddNestedOfOption] = useState(false)
  const ClearOptions = () => {
    setOptionDialog(false);
    setOptionTitle("");
    setOptionPrice(0);
    setOptionDescription("");
    setOptionImage(null);
    setOptionTabel([]);
    setSection_id(null);
    setOption_type(null);
    CleaderSections();
    setSelectOption(null)
    setAddNestedOfOption(false)
    setOptionsNum(0)
  };




  const OptionBody = (rowData) => {
    return (
      <div className={styles.TB_Content} style={{ justifyContent: "center" }}>
        <button
          className={`${styles.TabelButton} ${styles.Edite}`}
          onClick={() => {
            setOptionDialog(true);
            if (rowData.options) {
              setOptionTabel(rowData.options);
              console.log(rowData.options)
              setSection_id(rowData.id);
            }
          }}
        >
          <CgEye />
        </button>
      </div>
    );
  };

  const RealOptionBody = (rowData) => {
    return (
      <div className={styles.TB_Content} style={{ justifyContent: "center" }}>
        <button
          className={`${styles.TabelButton} ${styles.Edite}`}
          onClick={() => {
            setOptionDialog(true);
            setAddNestedOfOption(false)
            setSelectOption(rowData)
            setOptionTitle(rowData.name)
            setOptionPrice(rowData.price)
            setOptionDescription(rowData.description)
            setOptionImage(rowData.image)
            setSection_id(rowData.section_id)
             setProductId(rowData.id)
            if (rowData.options) {
              setOptionTabel(rowData.options);
              setSection_id(rowData.id);
            }
          }}
        >
          <CgEye />
        </button>
      </div>
    );
  };

  const AddListOption = (rowData) => {
    return (
      <div className={styles.TB_Content} style={{ justifyContent: "center" }}>
        <button
          className={`${styles.TabelButton} ${styles.Edite}`}
          onClick={() => {
           setOptionsNum(OptionsNum+1)
          setAddNestedOfOption(true);
          setProductId(rowData.id)
          setOptionTabel(rowData.childrens)
          }}
        >
          <CgEye />
        </button>
      </div>
    );
  };


  const OptionImageBody = (rowData) => {
    return (
      <>
        <img src={rowData.image} alt={rowData.name} width={60} height={60} />
      </>
    );
  };

  


  const OptionsType = [
    { name: "Price $", id: 1 },
    { name: "Percent %", id: 2 },
  ];

  const CreateOption = () => {
    setAddNestedOfOption(false)
    if (OptionTitle.length <= 0 || !option_type) {
      showError("Check name and Price Type");
    } else {
      const data = {
        name: OptionTitle,
        price: OptionPrice,
        description: OptionDescription.length <= 0 ? null : OptionDescription,
        image: OptionImage,
        section_id: Section_id,
        product_id: ProductID,
        type: option_type.id,
      };
      dispatch(AddOptions(data))
        .unwrap()
        .then((res) => {
          
          if (res.success) {
            showSuccess();
            ClearOptions();
          } else {
            showError("something Went wrong");
          }
        });
    }
  };
  const optionsStatusBody = (rowData) => {
    return (
      <div className={styles.TB_Content} style={{ justifyContent: "center" }}>
        <button
          className={`${styles.TabelButton} ${styles.Cancel}`}
          onClick={() => {
            dispatch(DeleteOptions(rowData.id))
              .unwrap()
              .then((res) => {
                if (res.success) {
                  showSuccess();
                  ClearOptions();
                } else {
                  showError("Some thing went wrong");
                }
              });
          }}
        >
          <MdCancel />
        </button>
      </div>
    );
  };


const updateOption = () => {
  if (OptionTitle.length <= 0 || !option_type) {
    showError("Check name and Price Type");
  } else {
    const data = {
      "_method" : 'put',
      name: OptionTitle,
      price: OptionPrice,
      description: OptionDescription,
      image: OptionImage,
      type: option_type.id,
      product_id: ProductID,
    };
    dispatch(UpdateOptions(data))
      .unwrap()
      .then((res) => {
        
        if (res.success) {
          showSuccess();
          ClearOptions();
        } else {
          showError("something Went wrong");
        }
      });
  }
};

const AddSubOptions = () => {
   if(OptionsNum > 1){
    if (OptionTitle.length <= 0 || !option_type) {
      showError("Check name and Price Type");
    } else {
      const data = {
        name: OptionTitle,
        price: OptionPrice,
        image: OptionImage,
        type: option_type.id,
        parent_id: ProductID,
        
      };
      dispatch(AddNestedOfOptions(data))
        .unwrap()
        .then((res) => {
          
          if (res.success) {
            showSuccess();
            ClearOptions();
          } else {
            showError("something Went wrong");
          }
        });
   }
  }else{
    const data = {
      name: OptionTitle,
      parent_id: ProductID,
      
    };
    dispatch(AddNestedOfOptions(data))
      .unwrap()
      .then((res) => {
        
        if (res.success) {
          showSuccess();
          ClearOptions();
        } else {
          showError("something Went wrong");
        }
      });
  }
};












  return (
    <>
      <Toast ref={toast} />
      <Toast ref={toastBC} position="bottom-center" />
      <div className={styles.Tabel}>
        <DataTable
          paginator
          selectionMode="single"
          value={Products}
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
          <Column field="title" header=" Name " style={{ maxWidth: "7rem" }} />
          <Column field="price" header=" Price " style={{ maxWidth: "7rem" }} />
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
            body={HeaderBody}
            header=" Header "
            style={{ maxWidth: "7rem" }}
          />
          <Column
            body={FooterBody}
            header=" Footer "
            style={{ maxWidth: "7rem" }}
          />
          <Column
            body={SectionsBody}
            header=" Sections & Options"
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
            <div className="col-12 md:col-4 mt-5">
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
            <div className="col-12 md:col-4 mt-5">
              <span className="p-float-label w-full">
                <InputNumber
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  // keyfilter={"int"}
                  className={`${!price ? "p-invalid" : ""}`}
                  id="Price"
                  value={price}
                  onValueChange={(e) => setPrice(e.value)}
                />
                <label htmlFor="Price"> Price</label>
              </span>
            </div>

            {proCateg && (
              <div className="col-12 md:col-4  mt-5">
                <span className="p-float-label">
                  <Dropdown
                    id="Category"
                    value={category_id}
                    onChange={(e) => {
                      setCategory_id(e.value);
                    }}
                    options={proCateg}
                    optionLabel="name"
                    placeholder="Select Category"
                    className={`${!category_id ? "p-invalid" : ""} w-full`}
                  />
                  <label htmlFor="Category">Category </label>
                </span>
              </div>
            )}
            <div className="col-12 md:col-4 mt-5">
              <span className="p-float-label w-full">
                <InputNumber
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  // keyfilter={"int"}
                  className={`${!def_width ? "p-invalid" : ""}`}
                  id="def_width"
                  value={def_width}
                  onValueChange={(e) => Setdef_width(e.value)}
                />
                <label htmlFor="def_width"> Default Width</label>
              </span>
            </div>
            <div className="col-12 md:col-4 mt-5">
              <span className="p-float-label w-full">
                <InputNumber
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  // keyfilter={"int"}
                  className={`${!def_height ? "p-invalid" : ""}`}
                  id="def_height"
                  value={def_height}
                  onValueChange={(e) => Setdef_height(e.value)}
                />
                <label htmlFor="def_height"> Default Height</label>
              </span>
            </div>
            <div className="col-12 md:col-4 mt-5">
              <span className="p-float-label w-full">
                <InputNumber
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  className={`${!min_width ? "p-invalid" : ""}`}
                  id="min_width"
                  value={min_width}
                  onValueChange={(e) => Setmin_width(e.value)}
                />
                <label htmlFor="min_width"> Min Width</label>
              </span>
            </div>
            <div className="col-12 md:col-4 mt-5">
              <span className="p-float-label w-full">
                <InputNumber
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  className={`${!min_height ? "p-invalid" : ""}`}
                  id="min_height"
                  value={min_height}
                  onValueChange={(e) => Setmin_height(e.value)}
                />
                <label htmlFor="min_height"> Min Height</label>
              </span>
            </div>
            <div className="col-12 md:col-4 mt-5">
              <span className="p-float-label w-full">
                <InputNumber
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  className={`${!max_width ? "p-invalid" : ""}`}
                  id="max_width"
                  value={max_width}
                  onValueChange={(e) => Setmax_width(e.value)}
                />
                <label htmlFor="max_width"> Max Width</label>
              </span>
            </div>

            <div className="col-12 md:col-4 mt-5">
              <span className="p-float-label w-full">
                <InputNumber
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  className={`${!max_height ? "p-invalid" : ""}`}
                  id="max_height"
                  value={max_height}
                  onValueChange={(e) => Setmax_height(e.value)}
                />
                <label htmlFor="max_height"> Max Height</label>
              </span>
            </div>
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
            {showmainImage &&
              !upImage &&
              showmainImage.map((ele) => (
                <div className="col-3  mt-5" key={ele}>
                  <div className="showImage">
                    <img src={ele} alt="Update" />
                  </div>
                </div>
              ))}
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
                  multiple={true}
                  onChange={(e) => {
                    setUpImages(e.target.files);
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
                <Message severity="success" text="Selected Image" />
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

        <Dialog
          visible={HeaderDialog}
          style={{ maxWidth: "90vw" }}
          onHide={() => {
            CleaderHeaders();
          }}
        >
          <h1 className="main-two">Add Headers</h1>
          <form
            className={`grid justify-content-center align-items-center ${styles.Dialog_Div}`}
          >
            <div className="col-12 mt-5">
              <span className="p-float-label w-full">
                <InputText
                  className={`${headerTitle.length <= 0 ? "p-invalid" : ""}`}
                  id="headerTitle"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                />
                <label htmlFor="headerTitle"> Title</label>
              </span>
            </div>
            <div className="col-12  mt-5">
              <div className="p-float-label w-full p-fluid">
                <Chips
                  id="tags"
                  value={headerLines}
                  onChange={(e) => setHeaderLines(e.value)}
                />
                <label htmlFor="tags">Tags </label>
              </div>
            </div>

            <div className="col-12  mt-5">
              <span className="p-float-label">
                <InputTextarea
                  id="Headerdescription"
                  value={Headerdescription}
                  className={`${
                    Headerdescription.length <= 0 ? "p-invalid" : ""
                  } `}
                  onChange={(e) => setHeaderDescription(e.target.value)}
                  rows={5}
                  cols={30}
                />
                <label htmlFor="Headerdescription"> Description </label>
              </span>
            </div>
          </form>
          <div className="flex justify-content-center align-items-center">
            <button
              className={`${styles.addBTN} mt-5 text-center`}
              onClick={() => Createheader()}
            >
              Save
            </button>
          </div>

          <DataTable
            paginator
            selectionMode="single"
            value={HeaderTabel}
            className={`${styles.dataTabel}`}
            dataKey="id"
            scrollable
            scrollHeight="100vh"
            filterDisplay="row"
            responsiveLayout="scroll"
            tableStyle={{ minWidth: "50rem" }}
            rows={10}
          >
            <Column
              field="title"
              header=" Name "
              style={{ maxWidth: "7rem" }}
            />
              <Column
              field="title"
              header=" Name "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              field="description"
              header=" Description "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              body={LinesBody}
              header=" Liens "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              header=" Status "
              body={HeaderStatusBody}
              style={{ maxWidth: "7rem" }}
            />
          </DataTable>
        </Dialog>
        <Dialog
          visible={FooterDialog}
          style={{ maxWidth: "90vw" }}
          onHide={() => {
            CleaderFooters();
          }}
        >
          <h1 className="main-two">Product Footer</h1>
          <form
            className={`grid justify-content-center align-items-center ${styles.Dialog_Div}`}
          >
            
            <div className="col-12">
              <ReactQuill
                style={{
                  background: "white",
                  height: "500px",
                }}
                theme="snow"
                value={Footerdescription}
                onChange={setFooterDescription}
                modules={modules}
              />
            </div>
          </form>
          <div className="flex justify-content-center align-items-center mt-5">
            <button
              className={`${styles.addBTN} mt-5 text-center`}
              onClick={() => CreateFooter()}
            >
              Save
            </button>
          </div>
        </Dialog>

        <Dialog
          visible={SectionDialog}
          style={{ maxWidth: "90vw" }}
          onHide={() => {
            CleaderSections();
          }}
        >
          <h1 className="main-two">Add Section</h1>
          <form
            className={`grid justify-content-center align-items-center ${styles.Dialog_Div}`}
          >
            <div className="col-12 mt-5">
              <span className="p-float-label w-full">
                <InputText
                  className={`${SectionTitle.length <= 0 ? "p-invalid" : ""}`}
                  id="SectionTitle"
                  value={SectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                />
                <label htmlFor="SectionTitle"> Title</label>
              </span>
            </div>

            <div className="col-12  mt-5">
              <span className="p-float-label">
                <InputText
                  keyfilter={"int"}
                  id="SectionOrder"
                  value={SectionOrder}
                  className={`${SectionOrder.length <= 0 ? "p-invalid" : ""} `}
                  onChange={(e) => setSectionOrder(e.target.value)}
                />
                <label htmlFor="SectionOrder"> Section Order </label>
              </span>
            </div>
          </form>
          <div className="flex justify-content-center align-items-center">
            <button
              className={`${styles.addBTN} mt-5 text-center`}
              onClick={() => CreateSection()}
            >
              Save
            </button>
          </div>

          <DataTable
            paginator
            selectionMode="single"
            value={SectionTabel}
            className={`${styles.dataTabel}`}
            dataKey="id"
            scrollable
            scrollHeight="100vh"
            filterDisplay="row"
            responsiveLayout="scroll"
            tableStyle={{ minWidth: "50rem" }}
            rows={10}
          >
            <Column field="name" header=" Name " style={{ maxWidth: "7rem" }} />
            <Column field="type" header=" Type " style={{ maxWidth: "7rem" }} />
            <Column
              body={OptionBody}
              header=" Option "
              style={{ maxWidth: "7rem" }}
            />

            <Column
              header=" Status "
              body={SectionStatusBody}
              style={{ maxWidth: "7rem" }}
            />
            
          </DataTable>
        </Dialog>

        <Dialog
          visible={OptionDialog}
          style={{ maxWidth: "90vw" }}
          onHide={() => {
            ClearOptions();
          }}
        >


            {/* ------------------------------------------------------------- */}


        
        {
          AddNestedOfOption ?  
          <>
           {OptionsNum > 1 ? 
            <>
            <h1 className="main-two">Add List Of Option</h1>
            <form
            className={`grid justify-content-center align-items-center ${styles.Dialog_Div}`}
          >
            <div className="col-12 md:col-4 mt-5">
              <span className="p-float-label w-full">
                <InputText
                  className={`${OptionTitle.length <= 0 ? "p-invalid" : ""}`}
                  id="OptionTitle"
                  value={OptionTitle}
                  onChange={(e) => setOptionTitle(e.target.value)}
                />
                <label htmlFor="OptionTitle"> Title</label>
              </span>
            </div>

            <div className="col-12 md:col-4  mt-5">
              <span className="p-float-label">
                <InputNumber
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  id="OptionPrice"
                  value={OptionPrice}
                  // className={`${!OptionPrice ? "p-invalid" : ""} `}
                  onValueChange={(e) => setOptionPrice(e.value)}
                  rows={5}
                  cols={30}
                />
                <label htmlFor="OptionPrice"> Price </label>
              </span>
            </div>
            <div className="col-12 md:col-4  mt-5">
              <span className="p-float-label">
                <Dropdown
                  id="Option_Price_Type"
                  value={option_type}
                  onChange={(e) => {
                    setOption_type(e.value);
                  }}
                  options={OptionsType}
                  
                  optionLabel="name"
                  placeholder="Select Price Type"
                  className={`${!option_type ? "p-invalid" : ""} w-full`}
                />
                <label htmlFor="Price Type">Price Type </label>
              </span>
            </div>
   
            <div className="col-12  mt-5">
              <div
                className={styles.change_store_image}
                style={{ borderColor: !OptionImage ? "red" : "#666d92" }}
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="storeImage"
                  name="storeImage"
                  accept="image/*"
                  // multiple={true}
                  onChange={(e) => {
                    setOptionImage(e.target.files[0]);
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
            {OptionImage && (
              <div className="col-12 text-center">
                <Message severity="success" text="Selected Image" />
              </div>
            )}
          </form>
            </>
           : 
            <>
                <h1 className="main-two">Add Option title</h1>
                <form
                className={`grid justify-content-center align-items-center ${styles.Dialog_Div}`}
              >
                <div className="col-12">
                  <span className="p-float-label w-full">
                    <InputText
                      className={`${OptionTitle.length <= 0 ? "p-invalid" : ""}`}
                      id="OptionTitle"
                      value={OptionTitle}
                      onChange={(e) => setOptionTitle(e.target.value)}
                    />
                    <label htmlFor="OptionTitle"> Title</label>
                  </span>
                </div>
              </form>
            </>
           }
          <div className="flex justify-content-center align-items-center">
            <button
              className={`${styles.addBTN} mt-5 text-center`}
              onClick={(id) => AddSubOptions(id)}
            >
              Add Sub Option
            </button>
          </div>
            </>
           : 
          SelectOption ?
            <>
            <h1 className="main-two">edit option</h1>
          <form
            className={`grid justify-content-center align-items-center ${styles.Dialog_Div}`}
          >
            <div className="col-12 md:col-4 mt-5">
              <span className="p-float-label w-full">
                <InputText
                  className={`${OptionTitle.length <= 0 ? "p-invalid" : ""}`}
                  id="OptionTitle"
                  value={OptionTitle}
                  onChange={(e) => setOptionTitle(e.target.value)}
                />
                <label htmlFor="OptionTitle"> Title</label>
              </span>
            </div>

            <div className="col-12 md:col-4  mt-5">
              <span className="p-float-label">
                <InputNumber
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  id="OptionPrice"
                  value={OptionPrice}
                  // className={`${!OptionPrice ? "p-invalid" : ""} `}
                  onValueChange={(e) => setOptionPrice(e.value)}
                  rows={5}
                  cols={30}
                />
                <label htmlFor="OptionPrice"> Price </label>
              </span>
            </div>
            <div className="col-12 md:col-4  mt-5">
              <span className="p-float-label">
                <Dropdown
                  id="Option_Price_Type"
                  value={option_type}
                  onChange={(e) => {
                    setOption_type(e.value);
                  }}
                  options={OptionsType}
                  
                  optionLabel="name"
                  placeholder="Select Price Type"
                  className={`${!option_type ? "p-invalid" : ""} w-full`}
                />
                <label htmlFor="Price Type">Price Type </label>
              </span>
            </div>
            <div className="col-12   mt-5">
              <span className="p-float-label">
                <InputText
                  id="OptionDescription"
                  value={OptionDescription}
                  // className={`${
                  //   OptionDescription.length <= 0 ? "p-invalid" : ""
                  // } `}
                  onChange={(e) => setOptionDescription(e.target.value)}
                  rows={5}
                  cols={30}
                />
                <label htmlFor="OptionDescription"> Description </label>
              </span>
            </div>
            <div className="col-12  mt-5">
              <div
                className={styles.change_store_image}
                style={{ borderColor: !OptionImage ? "red" : "#666d92" }}
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="storeImage"
                  name="storeImage"
                  accept="image/*"
                  // multiple={true}
                  onChange={(e) => {
                    setOptionImage(e.target.files[0]);
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
            {OptionImage && (
              <div className="col-12 text-center">
                <Message severity="success" text="Selected Image" />
              </div>
            )}
          </form>
          <div className="flex justify-content-center align-items-center">
            <button
              className={`${styles.addBTN} mt-5 text-center`}
              onClick={(id) => updateOption(id)}
            >
              edit
            </button>
          </div>

            </>
           : 
           <>
           <h1 className="main-two">Add Option</h1>
          <form
            className={`grid justify-content-center align-items-center ${styles.Dialog_Div}`}
          >
            <div className="col-12 md:col-4 mt-5">
              <span className="p-float-label w-full">
                <InputText
                  className={`${OptionTitle.length <= 0 ? "p-invalid" : ""}`}
                  id="OptionTitle"
                  value={OptionTitle}
                  onChange={(e) => setOptionTitle(e.target.value)}
                />
                <label htmlFor="OptionTitle"> Title</label>
              </span>
            </div>

            <div className="col-12 md:col-4  mt-5">
              <span className="p-float-label">
                <InputNumber
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  id="OptionPrice"
                  value={OptionPrice}
                  // className={`${!OptionPrice ? "p-invalid" : ""} `}
                  onValueChange={(e) => setOptionPrice(e.value)}
                  rows={5}
                  cols={30}
                />
                <label htmlFor="OptionPrice"> Price </label>
              </span>
            </div>

            <div className="col-12 md:col-4  mt-5">
              <span className="p-float-label">
                <Dropdown
                  id="Option_Price_Type"
                  value={option_type}
                  onChange={(e) => {
                    setOption_type(e.value);
                  }}
                  options={OptionsType}
                  optionLabel="name"
                  placeholder="Select Price Type"
                  className={`${!option_type ? "p-invalid" : ""} w-full`}
                />
                <label htmlFor="Price Type">Price Type </label>
              </span>
            </div>
            <div className="col-12   mt-5">
              <span className="p-float-label">
                <InputText
                  id="OptionDescription"
                  value={OptionDescription}
                  // className={`${
                  //   OptionDescription.length <= 0 ? "p-invalid" : ""
                  // } `}
                  onChange={(e) => setOptionDescription(e.target.value)}
                  rows={5}
                  cols={30}
                />
                <label htmlFor="OptionDescription"> Description </label>
              </span>
            </div>
            <div className="col-12  mt-5">
              <div
                className={styles.change_store_image}
                style={{ borderColor: !OptionImage ? "red" : "#666d92" }}
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="storeImage"
                  name="storeImage"
                  accept="image/*"
                  // multiple={true}
                  onChange={(e) => {
                    setOptionImage(e.target.files[0]);
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
            {OptionImage && (
              <div className="col-12 text-center">
                <Message severity="success" text="Selected Image" />
              </div>
            )}
          </form>
          <div className="flex justify-content-center align-items-center">
            <button
              className={`${styles.addBTN} mt-5 text-center`}
              onClick={() => CreateOption()}
            >
              Save
            </button>
          </div>

           </> 
        }
         {OptionsNum === 1 ? 
          <DataTable
            paginator
            selectionMode="single"
            value={OptionTabel}
            className={`${styles.dataTabel}`}
            dataKey="id"
            scrollable
            scrollHeight="100vh"
            filterDisplay="row"
            responsiveLayout="scroll"
            tableStyle={{ minWidth: "50rem" }}
            rows={10}
            
          >
            <Column field="name" header=" Title " style={{ maxWidth: "7rem" }} />
            <Column
              body={RealOptionBody}
              header=" Option "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              body={AddListOption}
              header=" list Option "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              header=" Status "
              body={optionsStatusBody}
              style={{ maxWidth: "7rem" }}
            />            
          </DataTable>
         :
         <DataTable
            paginator
            selectionMode="single"
            value={OptionTabel}
            className={`${styles.dataTabel}`}
            dataKey="id"
            scrollable
            scrollHeight="100vh"
            filterDisplay="row"
            responsiveLayout="scroll"
            tableStyle={{ minWidth: "50rem" }}
            rows={10}
            
          >
            <Column field="name" header=" Name " style={{ maxWidth: "7rem" }} />
            <Column
              field="price"
              header=" Price "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              field="description"
              header=" Description "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              body={OptionImageBody}
              header=" Image "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              body={RealOptionBody}
              header=" Option "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              body={AddListOption}
              header=" list Option "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              header=" Status "
              body={optionsStatusBody}
              style={{ maxWidth: "7rem" }}
            />            
          </DataTable>
         }
        </Dialog>





        
      </div>
    </>
  );
};

export default ProductsDash;
