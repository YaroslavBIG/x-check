import React from 'react';
import { Iitem } from '../../TaskInterface';
import { Button, Popover, Tag } from 'antd';
import { DeleteOutlined, InfoCircleOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
export const TaskItem = (props: Iitem) => {
	const { title, description, minScore, maxScore, mentorOnly } = props;

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
			<div className='task--control-buttons'>
				<Button
					type='text'
					icon={<EditOutlined />}
					size='middle'
					htmlType='submit'
					onSubmit={() => 'handleItemSubmit'}
				/>
				<Button
					type='text'
					htmlType='button'
					icon={<DeleteOutlined />}
					size='middle'
					onClick={() => 'onReset'}
				/>
			</div>
		</div>
	);
};
