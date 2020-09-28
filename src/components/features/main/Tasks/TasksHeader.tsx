import './Tasks.scss';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useContext } from 'react';
import { TaskDrawerContext } from './TaskDrawer/TaskDrawerContext';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { toast } from 'react-toastify';
import { Roles } from 'enum/roles.enum';

export const TasksHeader = () => {
	const { confirm } = Modal;

  const { setStateShowDrawer, selectedTasks, setSelectedTasks, userRole } = useContext(TaskDrawerContext);

  const showDrawer = () => {
		setStateShowDrawer(true);
  };

  useFirestoreConnect([ { collection: 'tasks' } ]);

	const updFirestore = useFirestore();

  const deleteFromFirebase = async (docName: string) => {
    try {
      updFirestore.collection('tasks').doc(docName).delete()
    } catch (error) {
      toast.error(error)
    }
  }

  const deleteDocs = async (array: string[]) => {
  for (const item of array) {
    await deleteFromFirebase(item);
  }
    toast.success('Task deleted')
  }

	const showConfirm = () => {
		confirm({
			title: 'Delete Tasks',
			icon: <ExclamationCircleOutlined />,
			content: 'Are you sure you want to delete the selected tasks?',
			onOk() {
				if(selectedTasks?.length){
          deleteDocs(selectedTasks)
        }
        setSelectedTasks([]);
			}
		});
	}

	return (
		<div className='tasks-header'>
			{userRole === Roles.ADMINISTRATOR ? <Button danger icon={<DeleteOutlined />} disabled={!selectedTasks?.length} className={'tasks-header--button'} onClick={showConfirm}>
				Delete
			</Button> : null}
			<Button type='primary' onClick={showDrawer}>
        {selectedTasks?.length ?
          <EditOutlined />
          :
          <PlusOutlined />
        }
        {selectedTasks?.length ? 'Edit' : 'Add' }
			</Button>
		</div>
	);
};
