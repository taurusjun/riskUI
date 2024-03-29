import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button } from 'antd';
import { useState, useEffect } from 'react';
import styles from './index.less';

const SingleRule = ({ variables, operators, ruleCondition, showMinus, onChange, onDelete }) => {
  const ruleCond = ruleCondition;

  const triggerChange = (changedValue) => {
    onChange?.({
      ...changedValue,
    });
  };

  //////  variables //////
  const variableOptions = [];
  let defaultVaraible = {};
  //{code:element}
  const variableOptionsMap = new Map();
  variables.forEach((ele) => {
    var opt = { label: ele.name, value: ele.code };
    variableOptions.push(opt);
    variableOptionsMap.set(ele.code, ele);
    if (ele.id == ruleCond.leftId) {
      defaultVaraible = { label: ele.name, value: ele.code };
    }
  });

  const onVariableChange = (newVariable) => {
    let varialeOpt = variableOptionsMap.get(newVariable);
    let leftId = varialeOpt ? varialeOpt.id : null;
    triggerChange({ ...ruleCond, leftId: leftId });
  };
  ////////////////////////

  //////  operators //////
  const operatorOptions = [];
  let defaultOperator = {};
  const operatorOptionsMap = new Map();
  operators.forEach((ele) => {
    var opt = { label: ele.name, value: ele.code };
    operatorOptions.push(opt);
    operatorOptionsMap.set(ele.code, ele);
    if (ele.code == ruleCond.operatorCode) {
      defaultOperator = { label: ele.name, value: ele.code };
    }
  });

  const onOperatorChange = (newOperator) => {
    triggerChange({ ...ruleCond, operatorCode: newOperator });
  };
  //////  right value //////

  const onRightValueChange = (e) => {
    let newRightValue = e.target.value;
    triggerChange({ ...ruleCond, rightValue: newRightValue });
  };

  //////  delete button //////
  const onRuleDelete = (e) => {
    onDelete(e);
  };

  return (
    <>
      <div style={{ display: 'inline-block' }}>
        <Select
          showSearch
          className={styles.customSelect}
          style={{ width: 150 }}
          placeholder="Variable"
          optionFilterProp="label"
          filterOption={(input, option) =>
            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())
          }
          options={variableOptions}
          defaultValue={defaultVaraible}
          onChange={onVariableChange}
        />
      </div>
      <div style={{ display: 'inline-block', marginLeft: 10, marginRight: 10 }}>
        <Select
          showSearch
          className={styles.customSelect}
          style={{ width: 70 }}
          placeholder="Operator"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())
          }
          options={operatorOptions}
          defaultValue={defaultOperator}
          onChange={onOperatorChange}
        />
      </div>
      <div style={{ display: 'inline-block', width: 70 }}>
        <Input placeholder="value" value={ruleCond.rightValue} onChange={onRightValueChange} />
      </div>
      <div style={{ display: 'inline-block', marginLeft: 10 }}>
        {showMinus && (
          <Button type="primary" shape="circle" icon={<MinusOutlined />} onClick={onRuleDelete} />
        )}
      </div>
    </>
  );
};

export default SingleRule;
