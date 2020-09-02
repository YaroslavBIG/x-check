import React, {Component} from 'react';
import "./Tasks"

import {Table} from 'antd';

const dataSource = [
    {
        key: '1',
        task_name: 'X-Check App',
        status: 'Published',
        due_data: '16/08',
        requests: 9177,
        author: 'Evan Flores',
        max_score: 640,
        actions: '...'
    },
    {
        key: '2',
        task_name: 'X-Check App',
        status: 'Published',
        due_data: '16/08',
        requests: 9177,
        author: 'Evan Flores',
        max_score: 640,
        actions: '...'
    },
    {
        key: '3',
        task_name: 'X-Check App',
        status: 'Published',
        due_data: '16/08',
        requests: 9177,
        author: 'Evan Flores',
        max_score: 640,
        actions: '...'
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
    },
    {
        title: 'Due Data',
        dataIndex: 'due_data',
        key: 'due_data',
    },
    {
        title: '#requests',
        dataIndex: 'requests',
        key: 'requests',
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
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
    },
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
