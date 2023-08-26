import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from "../../../styles/Tabel.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServicessPayment } from "../../../store/ProductsSlice";

const ServicesPaymentDash = () => {
  const dispatch = useDispatch();
  const { ServicesPaymentArr } = useSelector((state) => state.ProductsSlice);
  useEffect(() => {
    if (!ServicesPaymentArr) {
      dispatch(getServicessPayment());
    }
  }, [ServicesPaymentArr, dispatch]);
  return (
    <>
      <div className={styles.Tabel}>
        <DataTable
          paginator
          selectionMode="single"
          value={ServicesPaymentArr}
          className={`${styles.dataTabel}`}
          dataKey="id"
          scrollable
          scrollHeight="100vh"
          responsiveLayout="scroll"
          tableStyle={{ minWidth: "50rem" }}
          rows={10}
        >
          <Column
            field="model_id"
            header=" Model ID "
            style={{ maxWidth: "7rem" }}
          />
          <Column
            field="transaction_id"
            header=" Transaction Id "
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
          <Column
            header=" User Email "
            field={"user.email"}
            style={{ maxWidth: "7rem" }}
          />
          <Column field="price" header=" Total " style={{ maxWidth: "7rem" }} />
          <Column
            header="Created At "
            field={"created_at"}
            style={{ maxWidth: "7rem" }}
          />
        </DataTable>
      </div>
    </>
  );
};

export default ServicesPaymentDash;
