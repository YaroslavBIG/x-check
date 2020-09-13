import React, { useContext, useEffect } from 'react';
import { Form, Select, Input, Button } from 'antd';
import { TaskHeader } from './TaskHeader';
import { taskStatus, Itask, Iitem } from '../TaskInterface';
import { TaskContext } from './TaskContext';
import { TaskAccordion } from './Accordion/TaskAccordion';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { toast } from 'react-toastify';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Option } = Select;
const { TextArea } = Input;
export const TaskCreateDefault: React.FC = () => {
	const [ form ] = Form.useForm();
	const { newTask, setNewTask, items, newTaskForSubmit, setNewTaskForSubmit, addTaskToggler } = useContext(
		TaskContext
	);

	useFirestoreConnect([ { collection: 'demoTasks' } ]);

	const updFirestore = useFirestore();

	useFirestoreConnect([ { collection: 'demoTasks' } ]);

	interface taskStore {
		firestore: {
			data: {
				demoTasks: { [key: string]: Itask };
			};
		};
	}

  const allTask = useSelector((taskStore: taskStore) => taskStore.firestore.data.demoTasks);

  const submitNewTaskInfirebase = async () => {
    try {
      await updFirestore.collection('demoTasks').add(newTaskForSubmit)
    } catch {
      toast.error('something went wrong')
    }
  };

	const updateTaskInfirebase = async (taskKey: string) => {
     try { await updFirestore.collection('demoTasks').doc(taskKey).update(newTaskForSubmit)
    } catch {
      toast.error('something went wrong')
    }
  };

	const submitOnFireBase = () => {
		for (const task in allTask) {
			if (allTask[task] === Object(allTask[task])) {
				for (const item in allTask[task]) {
					if (item === 'id' && allTask[task].id === newTaskForSubmit.id) {
            return updateTaskInfirebase(task);
					}
				}
			}
		}
		return submitNewTaskInfirebase();
	};

	const updateSubmitStore = (values: any) => {
		setNewTask((prev: Itask) => ({
			...prev,
			...values,
			items: items
		}));

		setNewTaskForSubmit((prev: Itask) => ({
			...prev,
			...values,
			author: 'Get Name from login', // TODO: 'Get Name from login'
			maxScore: items.reduce((acc: number, item: Iitem) => {
				return acc + item.maxScore;
			}, 0),
			description: values.description || '',
			categoriesOrder: newTask.categoriesOrder,
			items: items
		}));
	};

	const handleAddCategory = () => {
		const values = form.getFieldsValue();
		updateSubmitStore(values);
		addTaskToggler();
	};

	const handleFormSubmit = async () => {
		const values = form.getFieldsValue();
		await updateSubmitStore(values);
		toast.success('Task was submited');
	};

	const onFinish = async (values: object) => {
		await submitOnFireBase();
	};

	const onFinishFailed = (errorInfo: object) => {
		toast.error(errorInfo);
	};

	const onReset = (): void => {
		form.resetFields();
	};

	useEffect(
		() => {
			form.setFieldsValue(newTaskForSubmit);
		},
		[ form, newTaskForSubmit ]
	);

	useEffect(
		() => {
			setNewTaskForSubmit((prev: Itask) => ({
				...prev,
				categoriesOrder: newTask.categoriesOrder,
				items: items
			}));
		},
		[ newTask, items, setNewTaskForSubmit ]
	);

	return (
		<div className='task'>
			<Form layout='vertical' form={form} name='Task Create' onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<TaskHeader onReset={onReset} handleSubmit={handleFormSubmit} title='Create Task' />
				<div className='task-status'>
					<Form.Item
						label='Satus'
						name='state'
						rules={[ { required: true, message: 'Please select status!' } ]}
					>
						<Select placeholder='Select status' aria-required style={{ width: 120 }} onChange={() => 1}>
							<Option value={taskStatus.DRAFT}>{taskStatus.DRAFT}</Option>
							<Option value={taskStatus.PUBLISHED}>{taskStatus.PUBLISHED}</Option>
							<Option value={taskStatus.ARCHIVED}>{taskStatus.ARCHIVED}</Option>
						</Select>
					</Form.Item>
				</div>
				<div className='task-title'>
					<Form.Item label='Title' name='id' rules={[ { required: true, message: 'Please input title!' } ]}>
						<Input placeholder='Type up to 30 characters' maxLength={30} />
					</Form.Item>
				</div>
				<div className='task-description'>
					<Form.Item label='Description' name='description'>
						<TextArea placeholder='Enter description here' autoSize={{ minRows: 2, maxRows: 10 }} />
					</Form.Item>
				</div>
			</Form>
			<div className='accordion'>{newTask.categoriesOrder.length ? <TaskAccordion /> : null}</div>
			<div className='task-add-category'>
				<Button type='default' size='middle' onClick={handleAddCategory} icon={<PlusOutlined />}>
					{' '}
					Add category{' '}
				</Button>
			</div>
		</div>
	);
};
