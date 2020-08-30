import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Collapse, Tag, Tooltip, InputNumber, Radio, Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './self-check.scss';

const { Panel } = Collapse;
const { TextArea } = Input;

const Selfcheck = () => {
  return (
    <div className="self-check">
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
            <div className="self-check__header">
              <h2>Self-check</h2>
              <div className="self-check__buttons"> 
                <Button size="large">Cancel</Button>
                <Button type="primary" size="large">Save</Button>
              </div>
            </div>
            <div className="self-check__current-values">
                <h3>Total points: 80/600</h3>
                <h3>Checked requirements: 10/20</h3>
            </div>
            <Collapse bordered={false} style={{backgroundColor: 'white'}}>
              <Panel header="Basic Scope" key="1">
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
                    <InputNumber size="small" min={0} max={30}/>
                    <Radio.Group>
                      <Radio value={1}>не выполнено</Radio>
                      <Radio value={2}>выполнено частично</Radio>
                      <Radio value={3}>выполнено полностью</Radio>
                    </Radio.Group>
                  </div>
                </div>
                <p className="comment">Добавить комментарий</p>
                <TextArea placeholder="Нажмите Ctrl + Enter, чтобы сохранить." autoSize />
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
                    <InputNumber size="small" min={0} max={30}/>
                    <Radio.Group>
                      <Radio value={1}>не выполнено</Radio>
                      <Radio value={2}>выполнено частично</Radio>
                      <Radio value={3}>выполнено полностью</Radio>
                    </Radio.Group>
                  </div>
                </div>
                <p className="comment">Добавить комментарий</p>
              </Panel>
              <Panel header="Advanced Scope" key="2">Advanced Scope</Panel>
              <Panel header="Extra Scope" key="3">Extra Scope</Panel>
            </Collapse>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Selfcheck;
