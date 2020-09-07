import React, { ReactText, useEffect } from 'react';
import { Avatar, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Sessions.module.scss';
import { Session } from '../../../../interfaces/app-session.interface';
import { COLORS, FRIENDLY_STATUS, SessionStatus } from '../../../../enum/session-status.enum';
import { FirestoreSession } from '../../../../interfaces/firestore-session.interface';
import SessionToolbar from './SessionToolbar/SessionToolbar';
import { UserOutlined } from '@ant-design/icons/lib';
import { setRowSelection } from './SessionsReducer';

export interface UserProfileData {
  photoURL: string;
  displayName: string;
}

const columns: ColumnsType<Session> = [
  {
    key: 'sessionName',
    title: 'Session',
    dataIndex: 'sessionName',
    ellipsis: true,
    sorter: (a: Session, b: Session) => {
      const x = a.sessionName.toUpperCase();
      const y = b.sessionName.toUpperCase();
      return x < y ? -1 : x > y ? 1 : 0;
    }
  },
  {
    key: 'taskName',
    title: 'Task',
    dataIndex: 'taskName',
    ellipsis: true,
    sorter: (a: Session, b: Session) => {
      const x = a.taskName.toUpperCase();
      const y = b.taskName.toUpperCase();
      return x < y ? -1 : x > y ? 1 : 0;
    }
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    filters: Object.values(FRIENDLY_STATUS).map(el => ({ text: el, value: el })),
    onFilter: (value: any, record: Session) => record.status.indexOf(value) === 0,
    render: (tag: SessionStatus) => (
      <>{tag &&
      <Tag color={COLORS[tag]} key={tag}>
        {tag.toUpperCase()}
      </Tag>
      }
      </>
    )
  },
  {
    key: 'qty',
    title: '# of attendees',
    dataIndex: 'qty',
    sorter: (a: Session, b: Session) => a.qty - b.qty,
    render: (tag: number) => (
      <Tag color='default' key={tag}>
        {tag}
      </Tag>
    )
  },
  {
    key: 'user',
    title: 'Lead',
    dataIndex: 'user',
    sorter: (a: Session, b: Session) => {
      const x = a.user?.displayName || 'Anonymous';
      const y = b.user?.displayName || 'Anonymous';
      return x < y ? -1 : x > y ? 1 : 0;
    },
    render: (user: UserProfileData) => (
      <div className={styles.user}>
        {user?.photoURL ? <Avatar src={user.photoURL} className={styles.user__avatar}/> :
          <Avatar icon={<UserOutlined/>} className={styles.user__avatar}/>}
        {user?.displayName ? <span>{user?.displayName}</span> : <span>Anonymous</span>}
      </div>
    )
  }
];

export interface SessionsRecord {
  [P: string]: FirestoreSession;
}

export interface SessionState {
  firestore: {
    status: {
      requesting: {
        sessions: boolean;
      }
    }
    data: {
      sessions: SessionsRecord
    }
  }
}

export default function Sessions() {
  const dispatch = useDispatch();
  const sessions: SessionsRecord = useSelector((state: SessionState) => state.firestore.data.sessions);
  const isLoadingData: boolean = useSelector((state: SessionState) => state.firestore.status.requesting.sessions);

  useEffect(() => {
    return function cleanup() {
      dispatch(setRowSelection([]));
    };
  });

  useFirestoreConnect([
    { collection: 'sessions' }
  ]);

  function getModifiedSessionData(): Session[] {
    const modifiedData: Session[] = [];
    if (sessions) {
      Object.keys(sessions).forEach((el: string) => {
        if (sessions[el]) {
          const values: FirestoreSession = sessions[el];
          modifiedData.push({
            key: el,
            sessionName: values?.name,
            taskName: values?.task?.taskName,
            qty: values?.attendees?.length,
            status: FRIENDLY_STATUS[values?.status as SessionStatus],
            user: values?.host
          });
        }
      });
    }
    return modifiedData;
  }

  return (
    <div>
      <div className={styles.toolbar}>
        <SessionToolbar/>
      </div>
      <div className={styles.main}>
        <Table loading={isLoadingData} columns={columns} style={{ width: '100%' }}
               dataSource={getModifiedSessionData()}
               pagination={{ pageSize: 7 }}
               rowSelection={{
                 onChange: (selectedRowKeys: ReactText[]) => {
                   dispatch(setRowSelection(selectedRowKeys));
                 }
               }}
        />
      </div>
    </div>
  );
}
