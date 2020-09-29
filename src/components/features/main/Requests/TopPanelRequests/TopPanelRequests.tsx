import React, { useContext, useState } from "react";
import styles from "./TopPanelRequests.module.scss";
import { Button, Form } from "antd";
import "antd/dist/antd.css";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import RequestForm from "../../RequestForm/RequestForm";
import confirm from "antd/lib/modal/confirm";
import { toast } from "react-toastify";
import { useFirestore } from "react-redux-firebase";
import { RequestsContext } from "../RequestsContext/RequestsContext";

const TopPanelRequests = () => {
  const [isVisible, setVisibility] = useState(false);
  const [form] = Form.useForm();
  const { selectedRequests, setSelectedRequests } = useContext(RequestsContext);

  const updFirestore = useFirestore();

  const deleteFromFirebase = async (docName: string) => {
    try {
      await  updFirestore.collection("requests").doc(docName).delete();
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteDocs = async (array: string[]) => {
    for (const item of array) {
      await deleteFromFirebase(item);
    }
    toast.success("Request deleted");
  };

  const showConfirm = () => {
    confirm({
      title: "Delete Requests",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete the selected requests?",
      onOk() {
        if (selectedRequests?.length) {
          deleteDocs(selectedRequests);
        }
        setSelectedRequests([]);
      },
    });
  };

  const handleClose = () => {
    setVisibility(false);
    form.resetFields();
  };

  return (
    <div className={styles.topPanelRequests__container}>
      <div className={styles.topPanelRequests__crud}>
        {" "}
        <Button
          icon={<EditOutlined />}
          className={styles.topPanelRequests__crud__edit}
        >
          Edit Request
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          disabled={false}
          className={"tasks-header--button"}
          onClick={showConfirm}
        >
          Delete Request
        </Button>
        <RequestForm isVisible={isVisible} onClose={handleClose} form={form} />
      </div>
    </div>
  );
};

export default TopPanelRequests;
