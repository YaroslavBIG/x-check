import React from 'react';
import { Form, Tag, Tooltip, InputNumber, Radio, Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface CategoryItemProps {
  item: TaskItem,
  isSelfcheck: boolean,
  selfGrade?: any,
  changedValues?: any,
  grade?: any
}

export interface TaskItem {
  id?: string,
  category?: string,
  title: string,
  description: string,
  maxScore: number,
  minScore: number,
  mentorOnly?: boolean,
  order: number,
}

const CategoryItem = (props: CategoryItemProps) => {
  const { item, isSelfcheck, grade, selfGrade, changedValues } = props;
console.log(changedValues);
  const handleChange = (id: any) => {
    console.log(id);
  }
  return (
    <div className="item">
      <div className="requirement">
        <div className="task-info">
          <Tooltip placement="bottomLeft" title={item.description}>
            <InfoCircleOutlined />
          </Tooltip>
          <p className="task-info__requirement">{item.title}</p>
        </div>
        <div className="tags">
          <Tag color='success'>{item.maxScore}</Tag>
          {item.minScore !== 0 && <Tag color='error'>{item.minScore}</Tag>}
          {item.mentorOnly && <Tag color='warning'>M</Tag>}
        </div>
        {
          !grade ?
          <div className="mark">
            <Form.Item name={`radio-group-${item.id}`}>
              <InputNumber size="small" min={item.minScore} max={item.maxScore}/>
            </Form.Item>
            <Form.Item name={`radio-group-${item.id}`}>
              <Radio.Group onChange={(e) => handleChange(item.id)}>
                <Radio value={0}>not performed</Radio>
                <Radio value={0.5*item.maxScore}>partially performed</Radio>
                <Radio value={item.maxScore}>performed</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          :
          <p className="result"><b>{grade[`radio-group-${item.id}`]}</b>
          {grade[`radio-group-${item.id}`] !== selfGrade[`radio-group-${item.id}`] &&
          <span> instead of <b>{selfGrade[`radio-group-${item.id}`]}</b></span>}</p>
        }

      </div>
      {!isSelfcheck && selfGrade[`textarea-${item.id}`] && <p className="clarification comment"><b>Comment:</b> {selfGrade[`textarea-${item.id}`]}</p>}
      {isSelfcheck ?
        <Form.Item
          name={`textarea-${item.id}`}
          label="Add comment"
        >
          <TextArea autoSize />
        </Form.Item>
        :
        ( !grade ?
        <Form.Item
          name={`review-${item.id}`}
          label="Add review"
          rules={[
            {
              required: changedValues?.includes(item.id),
              message: 'Please add a review',
            },
          ]}
        >
          <TextArea autoSize />
        </Form.Item>
        :
        <>
          <p className="clarification comment">{grade[`review-${item.id}`] && <span><b>Grade:</b> {grade[`review-${item.id}`]}</span>}</p>
          <Form.Item
            name={`dispute-${item.id}`}
            label="Dispute grade"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <TextArea autoSize />
          </Form.Item>
        </>
        )
      }
    </div>
  );
}

export default CategoryItem;
