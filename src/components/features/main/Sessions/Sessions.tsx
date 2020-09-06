import React from 'react';
import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import styles from './Sessions.module.scss';
import { Session } from '../../../../interfaces/app-session.interface';
import { COLORS, SessionStatus } from '../../../../enum/session-status.enum';
import { FirestoreSession } from '../../../../interfaces/firestore-session.interface';
import SessionToolbar from './SessionToolbar/SessionToolbar';

const columns: ColumnsType<Session> = [
  {
    key: 'sessionName',
    title: 'Session',
    dataIndex: 'sessionName',
    ellipsis: true
  },
  {
    key: 'taskName',
    title: 'Task',
    dataIndex: 'taskName',
    ellipsis: true
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
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
    render: (tag: number) => (
      <Tag color='default' key={tag}>
        {tag}
      </Tag>
    )
  }
];

interface SessionsRecord {
  [P: string]: FirestoreSession;
}

interface SessionState {
  firestore: {
    data: {
      sessions: SessionsRecord
    }
  }
}

export default function Sessions() {
  const sessions: SessionsRecord = useSelector((state: SessionState) => state.firestore.data.sessions);

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
            status: values?.status as SessionStatus
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
        <Table columns={columns} style={{ width: '100%' }}
               dataSource={getModifiedSessionData()}
               pagination={{ pageSize: 3 }}
               rowSelection={{
                 type: 'checkbox'
               }}
        />
      </div>
    </div>
  );
}
