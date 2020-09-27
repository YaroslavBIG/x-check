import React from "react";
import styles from "./TopPanelRequests.module.scss";
import { Button } from "antd";
import "antd/dist/antd.css";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const TopPanelRequests = () => {
  return (
    <div className={styles.topPanelRequests__container}>
      <div className={styles.topPanelRequests__crud}>
        <Button className={styles.topPanelRequests__crud__btn} type="primary">
          Create
        </Button>
        <Button
          icon={<EditOutlined />}
          className={styles.topPanelRequests__crud__edit}
        >
          Edit
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          className={styles.topPanelRequests__crud__delete}
        >
          Delete
        </Button>
        <InfoCircleOutlined className={styles.topPanelRequests__crud__info} />
      </div>
    </div>
  );
};

export default TopPanelRequests;
