import React from 'react';
import { Isubitem } from "../../TaskInterface";
import { Button } from 'antd';
import { SaveOutlined, DeleteOutlined } from '@ant-design/icons';
export const TaskItem = (props: Isubitem) => {
  const {
    title,
    description,
    order,
    minScore,
    maxScore,
    mentorOnly
  } = props;

  return (
    <div className="task--item">
      <div className="item--ico">ico</div>
      <div className="task--title">{title}</div>
      <div className="task--min-score">{minScore}</div>
      <div className="task--max-score">{maxScore}</div>
      <Button icon={<SaveOutlined />} size='middle' htmlType="submit" onSubmit={() => "handleItemSubmit"} />
      <Button htmlType="button" icon={<DeleteOutlined />} size='middle' onClick={() => "onReset"} />
    </div>
  )
}
