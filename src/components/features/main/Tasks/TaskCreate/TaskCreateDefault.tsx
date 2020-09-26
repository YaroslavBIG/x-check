import React, { useContext, useEffect } from 'react';
import { Form, Select, Input, Button } from 'antd';
import { TaskHeader } from './TaskHeader';
import { taskStatus, Itask, Iitem, ItaskStore } from 'interfaces/TaskInterface';
import { TaskContext } from './TaskContext';
import { TaskAccordion } from './Accordion/TaskAccordion';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { toast } from 'react-toastify';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { TaskDrawerContext } from '../TaskDrawer/TaskDrawerContext';
import { TaskExport } from './TaskExport/TaskExport';
import { IProfileState }from '../../CustomHeader/CustomHeader';
import { TaskImport } from './TaskExport/TaskImport';
import { Group } from 'antd/lib/avatar';

const { Option } = Select;
const { TextArea } = Input;
export const TaskCreateDefault: React.FC = () => {
	const [ form ] = Form.useForm();
	const {
		newTask,
		setNewTask,
		items,
		newTaskForSubmit,
		setNewTaskForSubmit,
		setAddTask,
		oldTaskName,
    setOldTaskName,
    resetTaskToInitialState
	} = useContext(TaskContext);

	useFirestoreConnect([ { collection: 'tasks' } ]);

	const updFirestore = useFirestore();

  const allTask = useSelector((store: ItaskStore) => store.firestore.data.tasks);
  const profileName = useSelector((state: IProfileState) => state.firebase.profile.displayName);

	const submitNewTaskInfirebase = async () => {
		try {
			await updFirestore.collection('tasks').add(newTaskForSubmit);
		} catch (error) {
			toast.error('something went wrong', error);
		}
	};

	const updateTaskInfirebase = async (taskKey: string) => {
		try {
			await updFirestore.collection('tasks').doc(taskKey).update(newTaskForSubmit);
		} catch (error) {
			toast.error('something went wrong', error);
		}
	};

	const submitOnFireBase = () => {
		for (const task in allTask) {
			if (allTask[task] === Object(allTask[task])) {
				for (const item in allTask[task]) {
					if (item === 'id' && allTask[task].id === (oldTaskName || newTaskForSubmit.id)) {
						setOldTaskName(newTaskForSubmit.id);
						return updateTaskInfirebase(task);
					}
				}
			}
		}
		return submitNewTaskInfirebase();
	};

	useEffect(
		() => {
			setNewTask((prev: Itask) => ({
				...prev,
				items: items
			}));
		},
		[ items, setNewTask ]
	);

	const updateSubmitStore = (values: any) => {
		setNewTask((prev: Itask) => ({
			...prev,
			...values,
			items: items
    }));


		setNewTaskForSubmit((prev: Itask) => ({
			...prev,
      ...values,
      id: values.id || newTask.id,
			author: profileName || 'Unknown author',
			maxScore: items.reduce((acc: number, item: Iitem) => {
				return acc + item.maxScore;
			}, 0),
			description: values.description || newTask.description,
			categoriesOrder: newTask.categoriesOrder,
			items: items,
			lastUpdate: new Date().toLocaleDateString()
		}));
	};

	const handleAddCategory = () => {
		const values = form.getFieldsValue();
		updateSubmitStore(values);
		setAddTask(true);
	};

	const handleFormSubmit = async () => {
    form.validateFields()
    .then(() => toast.success('Task was submitted'))
    .catch((e) => toast.error(e));
		const values = form.getFieldsValue();
    await updateSubmitStore(values);

	};

	const onFinish = async (values: object) => {
    await submitOnFireBase();
    setStateShowDrawer(false);
    form.resetFields();
    resetTaskToInitialState()
	};

	const onFinishFailed = (errorInfo: object) => {
		toast.error(errorInfo);
	};

	const { setStateShowDrawer } = useContext(TaskDrawerContext);

	const onReset = (): void => {
		form.resetFields();
    setStateShowDrawer(false);
    resetTaskToInitialState();
	};

	useEffect(
		() => {
			form.setFieldsValue(newTask);
			setNewTaskForSubmit((prev: Itask) => ({
				...prev,
				categoriesOrder: newTask.categoriesOrder,
				items: items
			}));
		},
		[ newTask, items, setNewTaskForSubmit, form ]
  );

	return (
		<div className='task'>
			<Form layout='vertical' form={form} name='Task Create' onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<TaskHeader onReset={onReset} handleSubmit={handleFormSubmit} title='Create Task' />
         <div className="file-block">
            <Form.Item >
              <Group >
                <TaskExport />
                <TaskImport />
              </Group>
          </Form.Item>
         </div>
				<div className='task-status'>
					<Form.Item
						label='Status'
						name='state'
						rules={[ { required: true, message: 'Please select status!' } ]}
						initialValue={taskStatus.DRAFT}
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
			<div className='accordion'>{newTask?.categoriesOrder?.length ? <TaskAccordion /> : null}</div>
			<div className='task-add-category'>
				<Button type='default' size='middle' onClick={handleAddCategory} icon={<PlusOutlined />}>
					{' '}
					Add category{' '}
				</Button>
			</div>
		</div>
	);
};
