import { CheckCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { Iitem } from 'interfaces/TaskInterface';
import React from 'react';

export const TaskDescriptionItem = (el: Iitem) => {
	return (
		<div className='task--item'>
			<div className='task--title'>{el.title}</div>
			<div className='task--min-score'>
				<Tag color='error'>{el.minScore}</Tag>
				<Tag color='success'>{el.maxScore}</Tag>
				{el.mentorOnly ? (
					<Tag icon={<CheckCircleOutlined />} color='warning'>
						Mentor only
					</Tag>
				) : null}
			</div>
		</div>
	);
};
