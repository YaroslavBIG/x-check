import './Tasks.scss';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useContext } from 'react';
import { TaskDrawerContext } from './TaskDrawer/TaskDrawerContext';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { toast } from 'react-toastify';

export const TasksHeader = () => {
	const { confirm } = Modal;

	const { setStateShowDrawer, selectedTasks } = useContext(TaskDrawerContext);

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

	function showConfirm() {
		confirm({
			title: 'Delete Sessions',
			icon: <ExclamationCircleOutlined />,
			content: 'Are you sure you want to delete the selected sessions?',
			onOk() {
				if(selectedTasks?.length){
          deleteDocs(selectedTasks)
				}
			}
		});
	}

	return (
		<div className='tasks-header'>
			<Button danger icon={<DeleteOutlined />} disabled={!selectedTasks?.length} className={'tasks-header--button'} onClick={showConfirm}>
				Delete
			</Button>
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
