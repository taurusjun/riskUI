import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button } from 'antd';
import { useState, useEffect } from 'react';
import styles from './index.less';

const RuleAction = ({ actionOpts, onChange }) => {
  const [actions, setActions] = useState(actionOpts);

  const triggerChange = (changedValue) => {
    onChange?.(changedValue);
  };

  const onInputParamsChange = (action, paramList) => {
    console.log(paramList);
  };

  const addNewActionRow = (e, index) => {
    let actionsCopy = [...actions];
    actionsCopy.splice(index, 0, 9);
    setActions(actionsCopy);
  };

  const deleteActionRow = (e, index) => {
    let actionsCopy = [...actions];
    actionsCopy.splice(index, 1);
    setActions(actionsCopy);
  };

  return (
    <>
      {actions.length == 0 && <div style={{ padding: 10 }}>No Actions</div>}
      {actions.length > 0 && (
        <Row gutter={16}>
          <Col span={6}>
            <div style={{ textAlign: 'center' }}>Action</div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center' }}>Value</div>
          </Col>
        </Row>
      )}
      {actions.map((ac, index) => (
        <Row gutter={16} style={{ marginTop: 10 }}>
          <Col span={2}>
            <div style={{ display: 'inline-block', marginRight: 2 }}>
              <Button
                type="primary"
                shape="circle"
                size="small"
                icon={<PlusOutlined />}
                onClick={(e) => addNewActionRow(e, index)}
              />
            </div>
            <div style={{ display: 'inline-block' }}>
              <Button
                type="primary"
                shape="circle"
                size="small"
                icon={<MinusOutlined />}
                onClick={(e) => deleteActionRow(e, index)}
              />
            </div>
          </Col>
          <Col span={6}>
            <div>
              <Select key={ac + '_' + index + 'ac'} defaultValue="AddTag" style={{ width: '100%' }}>
                <Select.Option value="AddTag">Add Tag</Select.Option>
              </Select>
            </div>
          </Col>
          <Col span={8}>
            <div>
              <Select
                key={ac + '_' + index + 'params'}
                mode="multiple"
                allowClear
                style={{ width: 300 }}
                placeholder="Please select"
                defaultValue={['highRisk', 'return']}
                onChange={(val) => onInputParamsChange('AddTag', val)}
              >
                <Select.Option value="highRisk">highRisk</Select.Option>
                <Select.Option value="return">return</Select.Option>
                <Select.Option value="norisk">noRisk</Select.Option>
              </Select>
            </div>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default RuleAction;
