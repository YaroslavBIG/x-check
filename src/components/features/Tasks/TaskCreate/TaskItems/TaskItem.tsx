import React from 'react';
import { Iitem } from '../../TaskInterface';
import { Button, Popover, Tag } from 'antd';
import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { TaskItemButtons } from './TaskItemButtons';

export const TaskItem = (props: Iitem) => {
	const { title, description, minScore, maxScore, mentorOnly, id } = props;

	return (
		<div className='task--item'>
			<div className='item--ico'>
				<Popover content={description} title='Title'>
					<Button type='text' icon={<InfoCircleOutlined />} />
				</Popover>
			</div>
			<div className='task--title'>{title}</div>
			<div className='task--min-score'>
				<Tag color='error'>{minScore}</Tag>
				<Tag color='success'>{maxScore}</Tag>
				{mentorOnly ? (
					<Tag icon={<CheckCircleOutlined />} color='warning'>
						Mentor only
					</Tag>
				) : null}
			</div>
			<TaskItemButtons elTitle={title} elId={id} />
		</div>
	);
};
