import React, {Component} from 'react';
import "./Tasks"
import { SearchOutlined } from '@ant-design/icons';
import {Table, Tag, Input, Button, Space} from 'antd';
import Highlighter from "react-highlight-words";

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





class Tasks extends Component {
    state = {
        searchText: '',
        searchedColumn: '',
    };



    getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value: any, record: any) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: (text: any) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters: any) => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    private searchInput: any;



    render() {
        //Data
        const columns = [
            {
                title: 'Task Name',
                dataIndex: 'task_name',
                key: 'task_name',
                ...this.getColumnSearchProps('task_name'),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status: string) => renderStatus(status),
                filters: filtersStatus,
                onFilter: (value:any, record:any) => record.status.indexOf(value) === 0,
            },
            {
                title: 'Due Data',
                dataIndex: 'due_data',
                key: 'due_data',
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

        return (
            <>
                <Table dataSource={dataSource} columns={columns} rowSelection={{
                    type: 'checkbox'
                }}/>
            </>
        );
    }
}

export default Tasks;
