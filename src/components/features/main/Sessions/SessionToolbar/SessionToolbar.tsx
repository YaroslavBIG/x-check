import React from 'react';
import { Button } from 'antd';
import styles from './SessionToolbar.module.scss';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons/lib';
import { useFirestore } from 'react-redux-firebase';
import cuid from 'cuid';
import { useSelector } from 'react-redux';

interface UserState {
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

export default function SessionToolbar() {
  const firestore = useFirestore();
  const currentUserData = useSelector((state: UserState) => state.firebase.profile);
  const currentUserId = useSelector((state: UserState) => state.firebase.auth.uid);

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

  return (
    <>
      <Button icon={<EditOutlined/>}>Edit</Button>
      <Button icon={<DeleteOutlined/>} className={styles.button}>Delete</Button>
      <Button type='primary' icon={<PlusOutlined/>} onClick={() => addSession()}
              className={styles.button}>Add</Button>
    </>
  );
}
