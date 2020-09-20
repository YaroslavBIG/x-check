import React, { ReactText } from 'react';
import { Button, Modal } from 'antd';
import styles from './SessionToolbar.module.scss';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons/lib';
import { useFirestore } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { openSessionForm } from '../SessionsReducer';
import { SessionsRecord, SessionsState } from '../../../../../interfaces/sessions-state.interface';

const { confirm } = Modal;

export default function SessionToolbar() {
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const selectedRows = useSelector((state: SessionsState) => state.sessions.rows);
  const sessions: SessionsRecord = useSelector(
    (state: SessionsState) => state.firestore.data.sessions,
  );

  function showConfirm() {
    confirm({
      title: 'Delete Sessions',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete the selected sessions?',
      onOk() {
        deleteSession();
      },
    });
  }

  function addSession() {
    dispatch(openSessionForm(null));
  }

  function updateSession() {
    if (selectedRows && selectedRows[0]) {
      const dataForForm = {
        ...sessions[selectedRows[0]],
        id: selectedRows[0],
      };
      dispatch(openSessionForm(dataForForm));
    }
  }

  async function deleteSession() {
    try {
      await selectedRows.forEach((row: ReactText) =>
        firestore.delete({ collection: 'sessions', doc: row as string }),
      );
      toast.info('Sessions successfully removed');
    } catch (e) {
      toast.error(e);
    }
  }

  return (
    <>
      <Button
        icon={<EditOutlined />}
        disabled={selectedRows?.length !== 1}
        onClick={() => updateSession()}>
        Edit
      </Button>
      <Button
        icon={<DeleteOutlined />}
        disabled={!selectedRows?.length}
        className={styles.button}
        onClick={showConfirm}>
        Delete
      </Button>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => addSession()}
        className={styles.button}>
        Add
      </Button>
    </>
  );
}
