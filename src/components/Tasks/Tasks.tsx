import React, {Component} from 'react';
import "./Tasks"
import { TaskCreate } from 'components/Tasks/TaskCreate';

export default class Tasks extends Component{
    render() {
        return (
            <div>
                <TaskCreate />
            </div>
        )
    }
}
