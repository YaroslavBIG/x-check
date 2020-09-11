import React from 'react';
import { Drawer, Form, Collapse, Tag, Tooltip, InputNumber, Radio, Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './Self-check.scss';
import FormHeader from '../FormHeader/FormHeader';

const { Panel } = Collapse;
const { TextArea } = Input;

interface SelfcheckProps {
  isVisible: boolean,
  onClose: () => void,
  form: any
}

const Selfcheck = (props: SelfcheckProps) => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const handleRadioChange = (event: any) => {
    console.log(event);
  }

  return (
    <Drawer 
      closable={false}
      visible={props.isVisible}
      placement='left'
      width={600}
      title={
        <FormHeader title="Self-check" onClose={props.onClose}/>
    }
    >
    <div className="self-check">
        <Form name="self-check" form={props.form} onFinish={onFinish}>
          <div className="self-check__current-values">
              <h3>Total points: 80/600</h3>
              <h3>Checked requirements: 10/20</h3>
          </div>
          <Collapse bordered={false} style={{backgroundColor: 'white'}}>
            <Panel header="Basic Scope" key="1">
              <div className="item">
                <div className="requirement">
                  <div className="task-info">
                    <Tooltip placement="bottomLeft" title="У пользователя также должна быть одна или несколько ролей. Роли выбираются при логине или регистрации (если она есть).">
                      <InfoCircleOutlined />
                    </Tooltip>
                    <p className="task-info__requirement">Упрощённая страница/окно авторизации.</p>
                  </div>
                  <div className="tags">
                    <Tag>30</Tag> 
                  </div>
                  <div className="mark">
                    <Form.Item name="input-number-1">
                      <InputNumber size="small" min={0} max={30}/>
                    </Form.Item>
                    <Form.Item name="radio-group-1">
                      <Radio.Group onChange={handleRadioChange}>
                        <Radio value={1}>not performed</Radio>
                        <Radio value={2}>partially performed</Radio>
                        <Radio value={3}>performed</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
                <p className="comment">Add comment</p>         
                <Form.Item name="textarea-1">
                  <TextArea placeholder="Press Ctrl + Enter to save." autoSize />
                </Form.Item>
              </div>
              <div className="item">
                <div className="requirement">
                  <div className="task-info">
                    <Tooltip placement="bottomLeft" title="У пользователя также должна быть одна или несколько ролей. Роли выбираются при логине или регистрации (если она есть).">
                      <InfoCircleOutlined />
                    </Tooltip>
                    <p className="task-info__requirement">Упрощённая страница/окно авторизации.</p>
                  </div>
                  <div className="tags">
                    <Tag>30</Tag> 
                  </div>
                  <div className="mark">
                    <Form.Item name="input-number-2">
                      <InputNumber size="small" min={0} max={30}/>
                    </Form.Item>
                    <Form.Item name="radio-group-2">
                      <Radio.Group>
                        <Radio value={1}>not performed</Radio>
                        <Radio value={2}>partially performed</Radio>
                        <Radio value={3}>performed</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
                <p className="comment">Add comment</p>
                <Form.Item name="textarea-2">
                  <TextArea placeholder="Press Ctrl + Enter to save." autoSize />
                </Form.Item>
              </div>
            </Panel>
            <Panel header="Advanced Scope" key="2">Advanced Scope</Panel>
            <Panel header="Extra Scope" key="3">Extra Scope</Panel>
          </Collapse>
        </Form>
    </div>
    </Drawer>
  );
}

export default Selfcheck;
