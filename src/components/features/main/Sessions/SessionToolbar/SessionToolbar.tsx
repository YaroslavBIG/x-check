import React, { ReactText } from 'react';
import { Button, Modal } from 'antd';
import styles from './SessionToolbar.module.scss';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons/lib';
import { useFirestore } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { openSessionForm } from '../SessionsReducer';
import { SessionsRecord, SessionsState } from '../Sessions';

export interface SessionToolbarState {
  sessions: {
    rows: ReactText[];
    isFormOpen: boolean;
    currentSession: any;
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
  const dispatch = useDispatch();
  const selectedRows = useSelector((state: SessionToolbarState) => state.sessions.rows);
  const sessions: SessionsRecord = useSelector((state: SessionsState) => state.firestore.data.sessions);

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
    dispatch(openSessionForm(null));
  }

  function updateSession() {
    if (selectedRows && selectedRows[0]) {
      console.log(selectedRows[0]);
      console.log(sessions[selectedRows[0]]);
      dispatch(openSessionForm(sessions[selectedRows[0]]));
      // firestore.set({ collection: 'sessions', doc: selectedRows[0] as string }, {
      //   name: 'UPDATED SESSION',
      //   task: { taskId: cuid(), taskName: 'UPDATED TASK1' },
      //   // createdBy: currentUserId,
      //   // host: {
      //   //   photoURL: currentUserData.photoURL,
      //   //   displayName: currentUserData.displayName
      //   // },
      //   status: 'CROSS_CHECK',
      //   coefficient: 0.9,
      //   attendees: [],
      //   attendeeIds: []
      // })
      //   .then(() => toast.info('Session successfully updated'))
      //   .catch((e) => toast.error(e));
    }
  }

  async function deleteSession() {
    try {
      await selectedRows.forEach((row: ReactText) => firestore.delete({ collection: 'sessions', doc: row as string }));
      toast.info('Sessions successfully removed');
    } catch (e) {
      toast.error(e);
    }
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
