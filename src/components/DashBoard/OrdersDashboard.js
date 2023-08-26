import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from "../../styles/Tabel.module.css";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  UPdateOrders,
  getCurrentProductOrders,
} from "../../store/ProductsSlice";
import { Button } from "primereact/button";
const OrdersDashboard = () => {
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
  const UserBody = (rowData) => {
    return (
      <div className=" flex justify-content-center flex-wrap align-items-center">
        {rowData.user.name}
      </div>
    );
  };

  // Search by Categories
  const StatusBody = (rowData) => {
    if (rowData.status_id === 1) {
      return (
        <div className=" flex justify-content-center flex-wrap align-items-center">
          جار البحث عن مندوب لك
        </div>
      );
    }
    if (rowData.status_id === 2) {
      return (
        <div className=" flex justify-content-center flex-wrap align-items-center">
          المندوب في طريقه لك
        </div>
      );
    }
    if (rowData.status_id === 3) {
      return (
        <div className=" flex justify-content-center flex-wrap align-items-center">
          تم الاستلام
        </div>
      );
    }
    if (rowData.status_id === 4) {
      return (
        <div className=" flex justify-content-center flex-wrap align-items-center">
          تم الالغاء
        </div>
      );
    }
  };

  const UpdateStatusBody = (rowData) => {
    return (
      <div className=" d-flex justify-content-between flex-wrap align-content-center StatusBtn ">
        <Button
          label="بحث عن مندوب"
          onClick={() => {
            const data = {
              id: rowData.id,
              status_id: 1,
            };
            dispatch(UPdateOrders(data))
              .unwrap()
              .then((res) => {
                if (res.success) {
                  dispatch(getCurrentProductOrders());
                  showSuccess();
                }
              });
          }}
        />
        <Button
          label="في الطريق"
          severity="success"
          onClick={() => {
            const data = {
              id: rowData.id,
              status_id: 2,
            };
            dispatch(UPdateOrders(data))
              .unwrap()
              .then((res) => {
                if (res.success) {
                  dispatch(getCurrentProductOrders());
                  showSuccess();
                }
              });
          }}
        />
        <Button
          label="تم الاستلام"
          severity="warning"
          onClick={() => {
            const data = {
              id: rowData.id,
              status_id: 3,
            };
            dispatch(UPdateOrders(data))
              .unwrap()
              .then((res) => {
                if (res.success) {
                  dispatch(getCurrentProductOrders());
                  showSuccess();
                }
              });
          }}
        />
        <Button
          label="تم الالغاء"
          severity="danger"
          onClick={() => {
            const data = {
              id: rowData.id,
              status_id: 4,
            };
            dispatch(UPdateOrders(data))
              .unwrap()
              .then((res) => {
                if (res.success) {
                  dispatch(getCurrentProductOrders());
                  showSuccess();
                }
              });
          }}
        />
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
            header=" user "
            body={UserBody}
            style={{ maxWidth: "7rem" }}
          />
          <Column field="total" header=" Total " style={{ maxWidth: "7rem" }} />
          <Column
            field="address"
            header=" Address "
            style={{ maxWidth: "7rem" }}
          />
          <Column field="city" header=" City " style={{ maxWidth: "7rem" }} />
          <Column
            header=" Status "
            body={StatusBody}
            style={{ minWidth: "50px" }}
          />

          <Column
            header=" UPdate State "
            body={UpdateStatusBody}
            style={{ maxWidth: "15rem" }}
          />
        </DataTable>
      </div>
    </>
  );
};

export default OrdersDashboard;
