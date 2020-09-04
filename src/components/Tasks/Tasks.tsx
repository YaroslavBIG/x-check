import React, {Component} from 'react';
import "./Tasks"

import {Table, Tag} from 'antd';

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

const dataSource = [
    {
        key: '1',
        task_name: 'X-Check App',
        status: 'Published',
        due_data: '16/08',
        author: 'Evan Flores',
        max_score: 640,
    },
    {
        key: '3',
        task_name: 'X-Check App',
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

const columns = [
    {
        title: 'Task Name',
        dataIndex: 'task_name',
        key: 'task_name',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => renderStatus(status),
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

class Tasks extends Component {


    render() {

        return (
            <>
                <Table dataSource={dataSource} columns={columns}/>
            </>
        );
    }
}

export default Tasks;
