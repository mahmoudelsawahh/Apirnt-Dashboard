import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from "../../../styles/Tabel.module.css";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import {
  UPdateOrders,
  getCurrentProductOrders,
} from "../../../store/ProductsSlice";
import { CgEye } from "react-icons/cg";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
const CurrentOrder = () => {
  const dispatch = useDispatch();
  const { OrdersArr } = useSelector((state) => state.ProductsSlice);
  useEffect(() => {
    if (!OrdersArr) {
      dispatch(getCurrentProductOrders());
    }
  }, [OrdersArr, dispatch]);
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
    // if (rowData.status === 1) {
    //   return (
    //     <div className=" flex justify-content-center flex-wrap align-items-center">
    //       Waiting for approval
    //     </div>
    //   );
    // }
    // if (rowData.status === 2) {
    //   return (
    //     <div className=" flex justify-content-center flex-wrap align-items-center">
    //       access denied
    //     </div>
    //   );
    // }
    // if (rowData.status === 3) {
    //   return (
    //     <div className=" flex justify-content-center flex-wrap align-items-center">
    //       It is approved and pending payment
    //     </div>
    //   );
    // }
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
    // { name: "Rejected", id: 2 },
    // { name: "Approved and pending payment", id: 3 },
    // { name: "Receive request", id: 4 },
    { name: "Sorting stage", id: 5 },
    { name: "Implementation phase", id: 6 },
    { name: "Storage stage", id: 7 },
    { name: "Delivery stage", id: 8 },
  ];
  const [order_status, setOrder_Status] = useState(null);

  const UpdateStatusBody = (rowData) => {
    return (
      <span className="p-float-label">
        <Dropdown
          id="OrderStatus"
          value={order_status}
          onChange={(e) => {
            // setOrder_Status(e.value);
            // if (e.value.id === 2) {
            // } else if (e.value.id === 3) {
            // } else {

            // }
            const data = {
              id: rowData.id,
              status_id: e.value.id,
            };
            dispatch(UPdateOrders(data))
              .unwrap()
              .then((res) => {
                if (res.success) {
                  dispatch(getCurrentProductOrders());
                  showSuccess();
                } else {
                  showError("something went wrong");
                }
              });
          }}
          options={Order_Status_Options}
          optionLabel="name"
          placeholder="OrderStatus"
          className={" w-full"}
        />
        <label htmlFor="OrderStatus">Order Status </label>
      </span>
    );
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
    //                 dispatch(getCurrentProductOrders());
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
    //                 dispatch(getCurrentProductOrders());
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
    //                 dispatch(getCurrentProductOrders());
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
    //                 dispatch(getCurrentProductOrders());
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
        <button
          className={`${styles.TabelButton}`}
          onClick={() => {
            setProductOrder(rowData.products);
            setProductDIalog(true);
          }}
        >
          <CgEye />
        </button>
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
          value={OrdersArr}
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
            header="Products "
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
      </div>
    </>
  );
};

export default CurrentOrder;
