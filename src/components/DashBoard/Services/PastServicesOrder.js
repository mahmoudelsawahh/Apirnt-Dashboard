import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from "../../../styles/Tabel.module.css";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import {
  UPdateOrders,
  getPastServicesOrders,
} from "../../../store/ProductsSlice";

const PastServicesOrder = () => {
  const dispatch = useDispatch();
  const { PastServicesOrderArr } = useSelector((state) => state.ProductsSlice);
  useEffect(() => {
    if (!PastServicesOrderArr) {
      dispatch(getPastServicesOrders());
    }
  }, [PastServicesOrderArr, dispatch]);
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

  const UpdateStatusBody = (rowData) => {
    if (rowData.status === 1) {
      return (
        <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
          <Button
            label="Rejected"
            onClick={() => {
              const data = {
                id: rowData.id,
                status_id: 2,
              };
              dispatch(UPdateOrders(data))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    dispatch(getPastServicesOrders());
                    showSuccess();
                  } else {
                    showError("something went wrong");
                  }
                });
            }}
          />
        </div>
      );
    }
    if (rowData.status === 2) {
      return (
        <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
          <Button
            label="Approved and pending payment"
            onClick={() => {
              const data = {
                id: rowData.id,
                status_id: 3,
              };
              dispatch(UPdateOrders(data))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    dispatch(getPastServicesOrders());
                    showSuccess();
                  } else {
                    showError("something went wrong");
                  }
                });
            }}
          />
        </div>
      );
    }
    if (rowData.status === 3) {
      return (
        <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
          <Button
            label="Receive request"
            onClick={() => {
              const data = {
                id: rowData.id,
                status_id: 4,
              };
              dispatch(UPdateOrders(data))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    dispatch(getPastServicesOrders());
                    showSuccess();
                  } else {
                    showError("something went wrong");
                  }
                });
            }}
          />
        </div>
      );
    }
    if (rowData.status === 4) {
      return (
        <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
          <Button
            label="Sorting stage"
            onClick={() => {
              const data = {
                id: rowData.id,
                status_id: 5,
              };
              dispatch(UPdateOrders(data))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    dispatch(getPastServicesOrders());
                    showSuccess();
                  } else {
                    showError("something went wrong");
                  }
                });
            }}
          />
        </div>
      );
    }
    if (rowData.status === 5) {
      return (
        <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
          <Button
            label="Implementation phase"
            onClick={() => {
              const data = {
                id: rowData.id,
                status_id: 6,
              };
              dispatch(UPdateOrders(data))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    dispatch(getPastServicesOrders());
                    showSuccess();
                  }
                });
            }}
          />
        </div>
      );
    }
    if (rowData.status === 6) {
      return (
        <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
          <Button
            label="Storage stage"
            onClick={() => {
              const data = {
                id: rowData.id,
                status_id: 7,
              };
              dispatch(UPdateOrders(data))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    dispatch(getPastServicesOrders());
                    showSuccess();
                  }
                });
            }}
          />
        </div>
      );
    }
    if (rowData.status === 7) {
      return (
        <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
          <Button
            label="Delivery stage"
            onClick={() => {
              const data = {
                id: rowData.id,
                status_id: 8,
              };
              dispatch(UPdateOrders(data))
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    dispatch(getPastServicesOrders());
                    showSuccess();
                  }
                });
            }}
          />
        </div>
      );
    }
    // if (rowData.status === 8) {
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
    //                 dispatch(getPastServicesOrders());
    //                 showSuccess();
    //               }
    //             });
    //         }}
    //       />
    //     </div>
    //   );
    // }
  };
  // const [ProductsOrder, setProductOrder] = useState([]);
  // const [productDialog, setProductDIalog] = useState(false);
  const ProductBody = (rowData) => {
    return (
      <div className={styles.TB_Content} style={{ justifyContent: "center" }}>
        {rowData.files.map((ele, idx) => (
          <Button
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

  // const ImagesBody = (rowData) => {
  //   return (
  //     <div className=" flex justify-content-center flex-wrap align-items-center">
  //       <img src={rowData.image} width={40} height={40} alt={rowData.title} />
  //     </div>
  //   );
  // };
  return (
    <>
      <Toast ref={toast} />

      <div className={styles.Tabel}>
        <DataTable
          paginator
          selectionMode="single"
          value={PastServicesOrderArr}
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

          {/* <Column
            header=" Update State "
            body={UpdateStatusBody}
            style={{ maxWidth: "15rem" }}
          /> */}
        </DataTable>
      </div>
    </>
  );
};

export default PastServicesOrder;
