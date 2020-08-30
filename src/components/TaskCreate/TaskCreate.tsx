import React from 'react';
import { Formik, Form } from 'formik';
import {Button, Select } from 'antd'; 


const {Option} = Select;
const TaskCreate = () => {
    enum taskStatus {
        DRAFT = 'Draft', 
        PUBLISHED = 'Published', 
        ARCHIVED = 'Archived'
    }
    return (
        <div className='task'>
            <Formik 
                initialValues={{
                picked: ""
                }}
                onSubmit={async values => {
                await new Promise(r => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
                }}
            >
            {({ values }) => (
                <Form>
                    <div className='task-header'>
                        <span>Create Task</span>
                        <Button type='primary' size='middle'>Cancel</Button>
                        <Button type='default' size='middle'>Save</Button>
                    </div>

                    <div className="task-status">
                        <span>Status</span>
                        <Select placeholder='Select status' style={{ width: 120 }} onChange={() => 1}>
                            <Option value={taskStatus.DRAFT}>{taskStatus.DRAFT}</Option>
                            <Option value={taskStatus.PUBLISHED}>{taskStatus.PUBLISHED}</Option>
                            <Option value={taskStatus.ARCHIVED}>{taskStatus.ARCHIVED}</Option>
                        </Select>
                    </div>
                </Form>
                    )}
        </Formik>
        </div>
        )
    
};

export default TaskCreate;
