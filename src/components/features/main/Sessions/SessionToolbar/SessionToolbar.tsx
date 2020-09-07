import React, { ReactText } from 'react';
import { Button, Modal } from 'antd';
import styles from './SessionToolbar.module.scss';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons/lib';
import { useFirestore } from 'react-redux-firebase';
import cuid from 'cuid';
import { useSelector } from 'react-redux';

interface SessionToolbarState {
  sessions: {
    rows: ReactText[]
  }
  firebase: {
    auth: {
      uid: string;
    }
    profile: {
      displayName: string;
      photoURL: string;
    }
  }
}

const { confirm } = Modal;

export default function SessionToolbar() {
  const firestore = useFirestore();
  const currentUserData = useSelector((state: SessionToolbarState) => state.firebase.profile);
  const currentUserId = useSelector((state: SessionToolbarState) => state.firebase.auth.uid);
  const selectedRows = useSelector((state: SessionToolbarState) => state.sessions.rows);

  function showConfirm() {
    confirm({
      title: 'Delete Sessions',
      icon: <ExclamationCircleOutlined/>,
      content: 'Are you sure you want to delete the selected sessions?',
      onOk() {
        deleteSession();
      }
    });
  }

  function addSession() {
    const exampleSession = {
      name: 'New session Name',
      task: { taskId: cuid(), taskName: 'This is Task Name which is very long to check if it looks properly' },
      createdBy: currentUserId,
      host: {
        photoURL: currentUserData.photoURL,
        displayName: currentUserData.displayName
      },
      status: 'COMPLETED',
      coefficient: 0.7,
      attendees: [],
      attendeeIds: []
    };
    return firestore.collection('sessions').add(exampleSession);
  }

  function updateSession() {

  }

  function deleteSession(): void {
    selectedRows.forEach((row) => {
      firestore.delete({ collection: 'sessions', doc: row as string });
    });
  }

  return (
    <>
      <Button icon={<EditOutlined/>} disabled={selectedRows?.length !== 1} onClick={() => updateSession()}>Edit</Button>
      <Button icon={<DeleteOutlined/>} disabled={!selectedRows?.length} className={styles.button}
              onClick={showConfirm}>Delete</Button>
      <Button type='primary' icon={<PlusOutlined/>} onClick={() => addSession()}
              className={styles.button}>Add</Button>
    </>
  );
}
