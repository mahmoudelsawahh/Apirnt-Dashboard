import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from "../../../styles/Tabel.module.css";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import {
  UPdateOrders,
  UPdatecurrentOrders,
  getCurrentServicesOrders,
} from "../../../store/ProductsSlice";
import { CgEye } from "react-icons/cg";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
const CurrentServicesOrder = () => {
  const dispatch = useDispatch();
  const { ServicessOrder } = useSelector((state) => state.ProductsSlice);
  useEffect(() => {
    if (!ServicessOrder) {
      dispatch(getCurrentServicesOrders());
    }
  }, [ServicessOrder, dispatch]);
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

  // Search by Categories
  const StatusBody = (rowData) => {
    if (rowData.status === 1) {
      return (
        <div className=" flex justify-content-center flex-wrap align-items-center">
          Waiting for approval
        </div>
      );
    }
    if (rowData.status === 2) {
      return (
        <div className=" flex justify-content-center flex-wrap align-items-center">
          access denied
        </div>
      );
    }
    if (rowData.status === 3) {
      return (
        <div className=" flex justify-content-center flex-wrap align-items-center">
          It is approved and pending payment
        </div>
      );
    }
    if (rowData.status === 4) {
      return (
        <div className=" flex justify-content-center flex-wrap align-items-center">
          Receive request
        </div>
      );
    }
    if (rowData.status === 5) {
      return (
        <div className=" flex justify-content-center flex-wrap align-items-center">
          Sorting stage
        </div>
      );
    }
    if (rowData.status === 6) {
      return (
        <div className=" flex justify-content-center flex-wrap align-items-center">
          Implementation phase
        </div>
      );
    }
    if (rowData.status === 7) {
      return (
        <div className=" flex justify-content-center flex-wrap align-items-center">
          Storage stage
        </div>
      );
    }
    if (rowData.status === 8) {
      return (
        <div className=" flex justify-content-center flex-wrap align-items-center">
          Delivery stage
        </div>
      );
    }
  };

  const Order_Status_Options = [
    { name: "Rejected", id: 2 },
    { name: "Approved and pending payment", id: 3 },
    { name: "Receive request", id: 4 },
    { name: "Sorting stage", id: 5 },
    { name: "Implementation phase", id: 6 },
    { name: "Storage stage", id: 7 },
    { name: "Delivery stage", id: 8 },
  ];

  const [order_status, setOrder_Status] = useState(null);

  // Save Price And Message
  const [Services_id, setServices_id] = useState(null);
  const [PriceDialog, setPriceDilog] = useState(false);
  const [messageDialog, setMessageDialog] = useState(false);
  const [Services_price, setServices_price] = useState(null);
  const [ServicesMessage, setServicessMessage] = useState("");
  const clearServicesInput = () => {
    setServices_id(null);
    setPriceDilog(false);
    setMessageDialog(false);
    setServices_price(null);
    setServicessMessage("");
  };
  const SendPrice = () => {
    const data = {
      id: Services_id,
      Data: {
        status: 3,
        price: Services_price,
      },
    };

    dispatch(UPdatecurrentOrders(data))
      .unwrap()
      .then((res) => {
        if (res.success) {
          dispatch(getCurrentServicesOrders());
          showSuccess();
          clearServicesInput();
        } else {
          showError("something went wrong");
        }
      });
  };
  const SendMessage = () => {
    const data = {
      id: Services_id,
      Data: {
        status: 2,
        message: ServicesMessage,
      },
    };
    dispatch(UPdatecurrentOrders(data))
      .unwrap()
      .then((res) => {
        if (res.success) {
          dispatch(getCurrentServicesOrders());
          showSuccess();
          clearServicesInput();
        } else {
          showError("something went wrong");
        }
      });
  };
  const UpdateStatusBody = (rowData) => {
    return (
      <span className="p-float-label">
        <Dropdown
          id="OrderStatus"
          value={order_status}
          onChange={(e) => {
            // setOrder_Status(e.value);
            setServices_id(rowData.id);
            if (e.value.id === 2) {
              setMessageDialog(true);
            } else if (e.value.id === 3) {
              setPriceDilog(true);
            } else {
              const data = {
                id: rowData.id,
                status_id: e.value.id,
              };
              dispatch(UPdateOrders(data))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    dispatch(getCurrentServicesOrders());
                    showSuccess();
                  } else {
                    showError("something went wrong");
                  }
                });
            }
          }}
          options={Order_Status_Options}
          optionLabel="name"
          placeholder="OrderStatus"
          className={" w-full"}
        />
        <label htmlFor="OrderStatus">Order Status </label>
      </span>
    );
    // if (rowData.status === 1) {
    //   return (
    //     <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
    //       <Button
    //         label="Rejected"
    //         onClick={() => {
    //           const data = {
    //             id: rowData.id,
    //             status_id: 2,
    //           };
    //           dispatch(UPdateOrders(data))
    //             .unwrap()
    //             .then((res) => {
    //               if (res.success) {
    //                 dispatch(getCurrentServicesOrders());
    //                 showSuccess();
    //               } else {
    //                 showError("something went wrong");
    //               }
    //             });
    //         }}
    //       />
    //     </div>
    //   );
    // }
    // if (rowData.status === 2) {
    //   return (
    //     <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
    //       <Button
    //         label="Approved and pending payment"
    //         onClick={() => {
    //           const data = {
    //             id: rowData.id,
    //             status_id: 3,
    //           };
    //           dispatch(UPdateOrders(data))
    //             .unwrap()
    //             .then((res) => {
    //               if (res.success) {
    //                 dispatch(getCurrentServicesOrders());
    //                 showSuccess();
    //               } else {
    //                 showError("something went wrong");
    //               }
    //             });
    //         }}
    //       />
    //     </div>
    //   );
    // }
    // if (rowData.status === 3) {
    //   return (
    //     <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
    //       <Button
    //         label="Receive request"
    //         onClick={() => {
    //           const data = {
    //             id: rowData.id,
    //             status_id: 4,
    //           };
    //           dispatch(UPdateOrders(data))
    //             .unwrap()
    //             .then((res) => {
    //               if (res.success) {
    //                 dispatch(getCurrentServicesOrders());
    //                 showSuccess();
    //               } else {
    //                 showError("something went wrong");
    //               }
    //             });
    //         }}
    //       />
    //     </div>
    //   );
    // }
    // if (rowData.status === 4) {
    //   return (
    //     <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
    //       <Button
    //         label="Sorting stage"
    //         onClick={() => {
    //           const data = {
    //             id: rowData.id,
    //             status_id: 5,
    //           };
    //           dispatch(UPdateOrders(data))
    //             .unwrap()
    //             .then((res) => {
    //               if (res.success) {
    //                 dispatch(getCurrentServicesOrders());
    //                 showSuccess();
    //               } else {
    //                 showError("something went wrong");
    //               }
    //             });
    //         }}
    //       />
    //     </div>
    //   );
    // }
    // if (rowData.status === 5) {
    //   return (
    //     <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
    //       <Button
    //         label="Implementation phase"
    //         onClick={() => {
    //           const data = {
    //             id: rowData.id,
    //             status_id: 6,
    //           };
    //           dispatch(UPdateOrders(data))
    //             .unwrap()
    //             .then((res) => {
    //               if (res.success) {
    //                 dispatch(getCurrentServicesOrders());
    //                 showSuccess();
    //               }
    //             });
    //         }}
    //       />
    //     </div>
    //   );
    // }
    // if (rowData.status === 6) {
    //   return (
    //     <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
    //       <Button
    //         label="Storage stage"
    //         onClick={() => {
    //           const data = {
    //             id: rowData.id,
    //             status_id: 7,
    //           };
    //           dispatch(UPdateOrders(data))
    //             .unwrap()
    //             .then((res) => {
    //               if (res.success) {
    //                 dispatch(getCurrentServicesOrders());
    //                 showSuccess();
    //               }
    //             });
    //         }}
    //       />
    //     </div>
    //   );
    // }
    // if (rowData.status === 7) {
    //   return (
    //     <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
    //       <Button
    //         label="Delivery stage"
    //         onClick={() => {
    //           const data = {
    //             id: rowData.id,
    //             status_id: 8,
    //           };
    //           dispatch(UPdateOrders(data))
    //             .unwrap()
    //             .then((res) => {
    //               if (res.success) {
    //                 dispatch(getCurrentServicesOrders());
    //                 showSuccess();
    //               }
    //             });
    //         }}
    //       />
    //     </div>
    //   );
    // }
  };
  const [ProductsOrder, setProductOrder] = useState([]);
  const [productDialog, setProductDIalog] = useState(false);
  const ProductBody = (rowData) => {
    return (
      <div className={styles.TB_Content} style={{ justifyContent: "center" }}>
        {rowData.files.map((ele, idx) => (
          <Button
            key={idx}
            className="mt-2 mr-2"
            style={{ fontSize: "14px" }}
            label={`files ${idx + 1}`}
            onClick={() => {
              window.open(ele);
            }}
          />
        ))}
      </div>
    );
  };

  const ImagesBody = (rowData) => {
    return (
      <div className=" flex justify-content-center flex-wrap align-items-center">
        <img src={rowData.image} width={40} height={40} alt={rowData.title} />
      </div>
    );
  };
  return (
    <>
      <Toast ref={toast} />

      <div className={styles.Tabel}>
        <DataTable
          paginator
          selectionMode="single"
          value={ServicessOrder}
          className={`${styles.dataTabel}`}
          dataKey="id"
          scrollable
          scrollHeight="100vh"
          responsiveLayout="scroll"
          tableStyle={{ minWidth: "50rem" }}
          rows={10}
        >
          <Column field="code" header=" Code " style={{ maxWidth: "7rem" }} />
          <Column
            field="service.name"
            header=" Services "
            style={{ maxWidth: "7rem" }}
          />
          <Column
            header=" User Name "
            field={"user.name"}
            style={{ maxWidth: "7rem" }}
          />
          <Column
            header=" User Phone "
            field={"user.phone"}
            style={{ maxWidth: "7rem" }}
          />
          <Column field="price" header=" Total " style={{ maxWidth: "7rem" }} />
          <Column
            header="Details "
            field={"details"}
            style={{ maxWidth: "7rem" }}
          />
          <Column
            header="Files "
            body={ProductBody}
            style={{ maxWidth: "7rem" }}
          />

          <Column
            header=" Status "
            body={StatusBody}
            style={{ minWidth: "50px" }}
          />

          <Column
            header=" Update State "
            body={UpdateStatusBody}
            style={{ maxWidth: "15rem" }}
          />
        </DataTable>
        <Dialog
          visible={productDialog}
          style={{ maxWidth: "90vw" }}
          onHide={() => {
            setProductDIalog(false);

            setProductOrder([]);
          }}
        >
          <h1 className="main-two">Products</h1>

          <DataTable
            paginator
            selectionMode="single"
            value={ProductsOrder}
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
              field="price"
              header=" Price "
              style={{ maxWidth: "7rem" }}
            />
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
          </DataTable>
        </Dialog>

        <Dialog
          visible={PriceDialog}
          style={{ maxWidth: "90vw", minWidth: "40vw" }}
          onHide={() => {
            clearServicesInput();
          }}
        >
          <h2 className="main-two">Send Price</h2>
          <div
            className={`grid justify-content-center align-items-center ${styles.Dialog_Div}`}
          >
            <div className="col-12  mt-5">
              <span className="p-float-label">
                <InputNumber
                  keyfilter={"int"}
                  // id="SectionOrder"
                  inputId="SectionOrder"
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  value={Services_price}
                  className={`${!Services_price ? "p-invalid" : ""} `}
                  onValueChange={(e) => setServices_price(e.value)}
                />
                <label htmlFor="SectionOrder"> Price </label>
              </span>
            </div>
          </div>
          <div className="flex justify-content-center align-items-center">
            <button
              className={`${styles.addBTN} mt-5 text-center`}
              onClick={() => SendPrice()}
            >
              Send
            </button>
          </div>
        </Dialog>

        <Dialog
          visible={messageDialog}
          style={{ maxWidth: "90vw", minWidth: "40vw" }}
          onHide={() => {
            clearServicesInput();
          }}
        >
          <h2 className="main-two ">Send the reason for rejection</h2>
          <div
            className={`grid justify-content-center align-items-center ${styles.Dialog_Div}`}
          >
            <div className="col-12  mt-5">
              <span className="p-float-label">
                <InputTextarea
                  inputId="Message_rejected"
                  cols={5}
                  rows={10}
                  value={ServicesMessage}
                  className={`${
                    ServicesMessage.length <= 0 ? "p-invalid" : ""
                  } `}
                  onChange={(e) => setServicessMessage(e.target.value)}
                />
                <label htmlFor="Message_rejected"> Message </label>
              </span>
            </div>
          </div>
          <div className="flex justify-content-center align-items-center">
            <button
              className={`${styles.addBTN} mt-5 text-center`}
              onClick={() => SendMessage()}
            >
              Send
            </button>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default CurrentServicesOrder;
