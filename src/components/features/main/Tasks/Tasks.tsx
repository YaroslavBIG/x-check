import React, { useEffect, useState } from 'react';
import './Tasks.scss';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Tag, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import firebase from 'firebase';
import { TasksHeader } from './TasksHeader';
import { TaskDrawerContextState } from './TaskDrawer/TaskDrawerContext';
import { TaskDrawer } from './TaskDrawer/TaskDrawer';
import { TaskLayout } from './TaskCreate';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import { ItaskStore } from 'interfaces/TaskInterface';
import { taskStatus } from 'enum/task.enums';
import { SessionsState } from 'interfaces/sessions-state.interface';
import { deleteTask, setTask, taskDescriptionVisible } from './TaskCreate/taskReducer/taskReducer';
import { ToastContainer } from 'react-toastify';
import { TaskDescription } from './TaskDrawer/TaskDescription/TaskDescription';

interface Tasks {
	key: string | number;
	taskName: string;
	status: string;
	updateTime: string;
	author: string;
	maxScore: number;
}

const transformTasks = (tasks: any, docId: string) => {
  const { id, state, lastUpdate, author, maxScore } = tasks;

	return {
		key: docId,
		taskName: id,
		status: state,
		updateTime: lastUpdate,
		author,
		maxScore
	};
};


export const Tasks = () => {
  const dispatch = useDispatch();
  const isLoadingData: boolean = useSelector((state: SessionsState) => state.firestore.status.requesting.tasks);

  const [ tasks, setTasks ] = useState<Array<Tasks> | Array<object>>([ {key: '797984684'} ]);
  const [ selectedRowKeys, setSelectedRowKeys ] = useState<(string | number)[] | undefined>([]);


  useFirestoreConnect([ { collection: 'tasks' } ]);

	const allTask = useSelector((taskStore: ItaskStore) => taskStore.firestore.data.tasks);

  useEffect(
    () => {
    selectedRowKeys?.length ? dispatch(setTask(allTask[selectedRowKeys[0]])) : dispatch(deleteTask())
  },
  [allTask, dispatch, selectedRowKeys]
  );

	useEffect(() => {
		const db = firebase.firestore();

		let tasks: any = [];

		db.collection('tasks').get().then((query) => {
			query.forEach((doc) => {
				tasks = [ ...tasks, transformTasks(doc.data(), doc.id) ];
			});
			setTasks(tasks);
		});
	}, [allTask]);


	const onSelectChange = (selectedRowKeys: (string | number)[] | undefined) => {
    setSelectedRowKeys(selectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange
	};

	const [ search, setSearch ] = useState({
		searchText: '',
		searchedColumn: ''
	});
	const { searchText, searchedColumn } = search;

	const handleSearch = (selectedKeys: string, confirm: any, dataIndex: string) => {
		confirm();
		setSearch({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex
		});
	};

	const handleReset = (clearFilters: any) => {
		clearFilters();
		setSearch((prevState: { searchText: string; searchedColumn: string }) => {
			return {
				...prevState,
				searchText: ''
			};
		});
	};

	let searchInput: any;

	const getColumnSearchProps = (dataIndex: any) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						searchInput = node;
					}}
					placeholder={`Search task name`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [ e.target.value ] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
          key={`SearchInput${dataIndex}`}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size='small'
            style={{ width: 90 }}
            key='SearchInputButtonSearch'
					>
						Search
					</Button>
					<Button key='SearchInputButtonReset' onClick={() => handleReset(clearFilters)} size='small' style={{ width: 90 }}>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value: any, record: any) =>
			record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
		onFilterDropdownVisibleChange: (visible: any) => {
			if (visible) {
				setTimeout(() => searchInput.select(), 100);
			}
		},
		render: (text: any) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[ searchText ]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			)
	});


	const renderStatus = (status: string) => {
    let color;

    switch (status) {
      case taskStatus.PUBLISHED:
        color = 'green';
        break;

      case taskStatus.PUBLISHED.toUpperCase():
        color = 'green';
        break;

      case taskStatus.DRAFT:
        color = 'orange';
        break;

      case taskStatus.DRAFT.toUpperCase():
        color = 'orange';
        break;
      default:
        color = 'default';
        break;
}

		return <Tag color={color}>{status?.toUpperCase()}</Tag>;
	};

	const filtersStatus = [
		{
			text: 'Published',
      value: 'Published',
      key: 'Published'
		},
		{
			text: 'Draft',
      value: 'Draft',
       key: 'Draft'
		},
		{
			text: 'Closed',
      value: 'Closed',
      key: 'Closed'
		}
  ];

  interface rows {
     [key: string]: string
  }

	const columns = [
		{
			title: 'Task Name',
			dataIndex: 'taskName',
			key: 'taskName',
			...getColumnSearchProps('taskName')
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (status: string) => renderStatus(status),
			filters: filtersStatus,
			onFilter: (value: any, record: any) => record.status.indexOf(value) === 0
		},
		{
			title: 'Last Update',
			dataIndex: 'updateTime',
			key: 'updateTime'
		},
		{
			title: 'Author',
			dataIndex: 'author',
			key: 'author'
		},
		{
			title: 'Max Score',
			dataIndex: 'maxScore',
			key: 'maxScore'
    },
    {
    key: 'action',
    render: (values: rows) => (
      <Space size="middle">
        <Button type='default' onClick={() => dispatch(taskDescriptionVisible(true, values.key))} >Description</Button>
      </Space>
    ),
  },
	];

	return (
		<TaskDrawerContextState selectedRowKeys={selectedRowKeys}>
      {/* <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    /> */}
			<TaskDrawer>
				<TaskLayout />
			</TaskDrawer>
      <TaskDescription />
			<div className='tasks'>
				<TasksHeader />
				<div className='tasks-table'>
          <Table
            loading={isLoadingData}
            dataSource={tasks}
            columns={columns}
            rowSelection={rowSelection}
          />
				</div>
			</div>
		</TaskDrawerContextState>
	);
};
