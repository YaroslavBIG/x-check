import React, {useEffect, useState} from 'react';
import "./Tasks"
import {SearchOutlined} from '@ant-design/icons';
import {Table, Tag, Input, Button, Space} from 'antd';
import Highlighter from "react-highlight-words";
import firebase from "firebase";

// Test static data
const dataSource = [
    {
        key: '0',
        task_name: 'X-Check App',
        status: 'Published',
        due_data: '16/08',
        author: 'Evan Flores',
        max_score: 640,
    },
    {
        key: '3',
        task_name: 'SongBird',
        status: 'Draft',
        due_data: '16/08',
        author: 'Evan Flores',
        max_score: 640,
    },
    {
        key: '2',
        task_name: 'X-Check App',
        status: 'Closed',
        due_data: '16/08',
        author: 'Evan Flores',
        max_score: 640,
    },

];

// TS-Interface
interface Tasks {
    key: string | number,
    task_name: string,
    status: string,
    due_data: string,
    author: string,
    max_score: number,
}

// Network
const transformTasks = (tasks: any) => {

    const {id, status, update_data, author, items, task_name} = tasks;
    return ({
        key: id,
        task_name,
        status,
        update_data,
        author,
        max_score: items.reduce((acc: any, cur: any) => {
            return acc + cur.maxScore
        }, 0)
    })
}

/*<Tasks[]>*/

const Tasks = () => {
    //Tasks block
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const db = firebase.firestore();

        let tasks: any = []

        db.collection('tasks').get()
            .then((query) => {
                query.forEach((doc) => {
                    console.log(doc.data())
                    tasks = [...tasks, transformTasks(doc.data())]
                })
                setTasks(tasks)
            })


    }, [])

    //Block of Selected row logic
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    //Block of search logic
    const [search, setSearch] = useState({
        searchText: '',
        searchedColumn: '',
    })
    const {searchText, searchedColumn} = search;

    const handleSearch = (selectedKeys: string, confirm: any, dataIndex: string) => {
        confirm();
        setSearch({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = (clearFilters: any) => {
        clearFilters();
        setSearch((prevState: { searchText: string, searchedColumn: string }) => {
            return {
                ...prevState,
                searchText: ''
            }
        });
    };

    let searchInput: any;

    const getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: any) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value: any, record: any) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: (text: any) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    // render-function for column-status
    const renderStatus = (status: string) => {
        let color;
        if (status === 'Published') {
            color = 'green'
        } else if (status === 'Draft') {
            color = 'orange'
        } else {
            color = 'default'
        }

        return (
            <Tag color={color} key={status}>
                {status.toUpperCase()}
            </Tag>
        )
    }
    // collection of status for column-status
    const filtersStatus = [
        {
            text: 'Published',
            value: 'Published',
        },
        {
            text: 'Draft',
            value: 'Draft',
        },
        {
            text: 'Closed',
            value: 'Closed',
        },
    ]

    const columns = [
        {
            title: 'Task Name',
            dataIndex: 'task_name',
            key: 'task_name',
            ...getColumnSearchProps('task_name'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => renderStatus(status),
            filters: filtersStatus,
            onFilter: (value: any, record: any) => record.status.indexOf(value) === 0,
        },
        {
            title: 'Last Update',
            dataIndex: 'update_data',
            key: 'update_data',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Max Score',
            dataIndex: 'max_score',
            key: 'max_score',
        }
    ];

    return (
        <>
            <Table dataSource={tasks}
                   columns={columns}
                   rowSelection={rowSelection}
            />
        </>
    );
}

export default Tasks;
