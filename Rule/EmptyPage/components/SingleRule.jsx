import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button } from 'antd';
import { useState, useEffect } from 'react';

const SingleRule = ({variables, operators, ruleCondition, showMinus, onChange, onDelete}) => {

  const ruleCond = ruleCondition;

  const triggerChange = (changedValue) => {
    onChange?.({
      ...changedValue,
      } );
  };
  
  //////  variables //////
  const onVariableChange = (newVariable) =>{
    triggerChange({...ruleCond, variable: newVariable});
  };

  const variableOptions = [];
  const variableOptionsMap = new Map();
  variables.forEach((value, key) => {
    var opt  = {label:value, value:key};
    variableOptions.push(opt);
    variableOptionsMap.set(key, opt);
  });

  const defaultVaraible = variableOptionsMap.get(ruleCond.variable);
  ////////////////////////

  //////  operators //////
  const onOperatorChange = (newOperator) =>{
    triggerChange({...ruleCond, operator: newOperator});
  };

  const operatorOptions = [];
  const operatorOptionsMap = new Map();
  operators.forEach((value, key) => {
    var opt  = {label:value, value:key};
    operatorOptions.push(opt);
    operatorOptionsMap.set(key, opt);
  });

  const defaultOperator = operatorOptionsMap.get(ruleCond.operator);
  //////  right value //////
  const [rightValue, setRightValue] = useState(ruleCond.value);

  const onRightValueChange = (e) =>{
    let newRightValue  = e.target.value;
    setRightValue(newRightValue);
    triggerChange({...ruleCond, value: newRightValue});
  };

  //////  delete button //////
  const onRuleDelete = (e) =>{
    onDelete(e);
  };
   
  return (
    <>
        <Col span={10}>
            <Select
              showSearch
              style={{ width: 200 }}
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
        </Col>
        <Col span={6}>
          <Select
              showSearch
              style={{ width: 100 }}
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
        </Col>
        <Col span={6}>
            <Input  
             placeholder='value' 
             value={rightValue}
             onChange={onRightValueChange}
            />
        </Col>
        <Col span={2}>
          <Row gutter={16}>
            <Col>
            {showMinus && 
              <Button
                  type="primary"
                  shape="circle"
                  icon={<MinusOutlined />}
                  onClick={onRuleDelete}
                />
            }
            </Col>
          </Row>
        </Col>
      </>
  );

};


export default SingleRule;
