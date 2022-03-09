import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button } from 'antd';
import { useState, useEffect } from 'react';
import styles from './index.less';

const RuleAction = ({ ruleActionArray, actionDefs, tagDict, onChange }) => {
  const [actions, setActions] = useState(ruleActionArray);

  const triggerChange = (changedValue) => {
    onChange?.(changedValue);
  };

  const onActionChange = (action, index) => {
    let actionsCopy = [...actions];
    actionsCopy[index].actionCode = action;
    setActions(actionsCopy);

    triggerChange(actionsCopy);
  };

  const onInputParamsChange = (value, index) => {
    let actionsCopy = [...actions];
    actionsCopy[index].paramsValue = JSON.stringify(value);
    setActions(actionsCopy);

    triggerChange(actionsCopy);
  };

  const addNewActionRow = (e, index) => {
    let actionsCopy = [...actions];
    actionsCopy.splice(index + 1, 0, {});
    setActions(actionsCopy);

    triggerChange(actionsCopy);
  };

  const deleteActionRow = (e, index) => {
    let actionsCopy = [...actions];
    actionsCopy.splice(index, 1);
    setActions(actionsCopy);

    triggerChange(actionsCopy);
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
      {actions.length == 0 && (
        <div style={{ padding: 10 }}>
          <div style={{ display: 'inline-block', marginRight: 2 }}>
            <Button
              type="primary"
              shape="circle"
              size="small"
              icon={<PlusOutlined />}
              onClick={(e) => addNewActionRow(e, -1)}
            />
          </div>
          No Actions
        </div>
      )}
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
        <Row gutter={16} style={{ marginTop: 10 }} key={ac.uuid}>
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
                defaultValue={ac.actionCode && actionOptionsMap.get(ac.actionCode).name}
                style={{ width: '100%' }}
                options={actionOptions}
                onChange={(val) => onActionChange(val, index)}
              />
            </div>
          </Col>
          <Col span={8}>
            <div>
              {ac.actionCode && actionOptionsMap.get(ac.actionCode).paramsType == 'List' && (
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: 300 }}
                  placeholder="Please select"
                  defaultValue={ac.paramsValue && JSON.parse(ac.paramsValue)}
                  options={tagOptions}
                  onChange={(val) => onInputParamsChange(val, index)}
                />
              )}
              {ac.actionCode && actionOptionsMap.get(ac.actionCode).paramsType == 'String' && (
                <Input
                  mode="multiple"
                  allowClear
                  style={{ width: 300 }}
                  placeholder="Please input"
                  defaultValue={ac.paramsValue}
                  onChange={(e) => onInputParamsChange(e.target.value, index)}
                />
              )}
            </div>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default RuleAction;
