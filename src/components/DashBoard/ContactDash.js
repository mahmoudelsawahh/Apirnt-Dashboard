import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import styles from "../../styles/Tabel.module.css";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

import { MdCancel } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { DeleteContact, getContacts } from "../../store/HomeSlice";

import { Button } from "primereact/button";

const ContactDash = () => {
  const dispatch = useDispatch();
  const { ContactArr } = useSelector((state) => state.HomeSlice);

  useEffect(() => {
    if (!ContactArr) {
      dispatch(getContacts());
    }
  }, [ContactArr, dispatch]);

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
                dispatch(DeleteContact(id))
                  .unwrap()
                  .then((res) => {
                    if (res.success) {
                      clear(true);
                    } else {
                      showError("some thing Wrong");
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

  //  buttons

  const StatusBody = (rowData) => {
    return (
      <div className={styles.TB_Content}>
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

  return (
    <>
      <Toast ref={toast} />
      <Toast ref={toastBC} position="bottom-center" />
      <div className={styles.Tabel}>
        <DataTable
          paginator
          selectionMode="single"
          value={ContactArr}
          className={`${styles.dataTabel}`}
          dataKey="id"
          scrollable
          scrollHeight="100vh"
          filterDisplay="row"
          responsiveLayout="scroll"
          tableStyle={{ minWidth: "50rem" }}
          // header={header2}
          rows={10}
        >
          <Column field="name" header=" Name " style={{ maxWidth: "7rem" }} />
          <Column field="email" header=" Email " style={{ maxWidth: "7rem" }} />
          <Column field="phone" header=" Phone " style={{ maxWidth: "7rem" }} />
          <Column
            field="message"
            header=" Message "
            style={{ maxWidth: "7rem" }}
          />
          <Column
            header=" Status "
            body={StatusBody}
            style={{ maxWidth: "7rem" }}
          />
        </DataTable>
      </div>
    </>
  );
};

export default ContactDash;
