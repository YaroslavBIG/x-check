import React, {Component} from 'react';
import "./Tasks"
import { TaskLayout } from './TaskCreate/TaskLayout';

export default class Tasks extends Component{
    render() {
        return (
            <div>
                <TaskLayout />
            </div>
        )
    }
}
