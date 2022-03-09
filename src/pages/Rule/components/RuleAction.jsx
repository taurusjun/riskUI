import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button } from 'antd';
import { useState, useEffect } from 'react';
import styles from './index.less';

const RuleAction = ({ ruleActionArray, actionDefs, tagDict, onChange }) => {
  const [actions, setActions] = useState(ruleActionArray);

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

  //////  actionOptions //////
  const actionOptions = [];
  const actionOptionsMap = new Map();
  actionDefs.forEach((ele) => {
    var opt = { label: ele.name, value: ele.code };
    actionOptions.push(opt);
    actionOptionsMap.set(ele.code, ele);
  });

  //////  tagOptions //////
  const tagOptions = [];
  const tagOptionsMap = new Map();
  tagDict.forEach((ele) => {
    var opt = { label: ele.description, value: ele.code };
    tagOptions.push(opt);
    tagOptionsMap.set(ele.code, ele);
  });

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
              <Select
                key={ac.actionCode + '_' + index + 'ac'}
                defaultValue={actionOptionsMap.get(ac.actionCode).name}
                style={{ width: '100%' }}
                options={actionOptions}
              />
            </div>
          </Col>
          <Col span={8}>
            <div>
              <Select
                key={ac.actionCode + '_' + index + 'params'}
                mode="multiple"
                allowClear
                style={{ width: 300 }}
                placeholder="Please select"
                defaultValue={JSON.parse(ac.paramsValue)}
                options={tagOptions}
                onChange={(val) => onInputParamsChange(ac.actionCode, val)}
              />
            </div>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default RuleAction;
