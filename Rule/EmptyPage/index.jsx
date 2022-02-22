import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button, Divider } from 'antd';
import styles from './index.less';
import RuleGroup from './components/RuleGroup'
import SingleLogic from './components/SingleLogic'
import Rule from './components/Rule'
import Container from './components/Container';
import { useForceUpdate } from './components/useForceUpdate';
import { keygenerator } from './components/Keygenerator';

export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  
  ///////
  const variablesJson = {
    "1":"Not Identified",
    "2":"Closed",
  };

  const variables = new Map(Object.entries(variablesJson));

  const operatorsJson = {
    "eq":"==",
    "gt":">",
  };

  const operators = new Map(Object.entries(operatorsJson));

  const logicOpsJson = {
    "or":"OR",
    "and":"AND"
  };
  const logicOps = new Map(Object.entries(logicOpsJson));
  ///////
  const ruleCondition = {
    _key: keygenerator(),
    logic:"and",
    variable:"2",
    operator:"gt",
    value:"999"
  };

  const ruleCondition2 = {
    _key: keygenerator(),
    logic:"or",
    variable:"1",    
    operator:"eq",
    value:"888"
  };

  const ruleCondition3 = {
    _key: keygenerator(),
    logic:"or",
    variable:"2",    
    operator:"gt",
    value:"777"
  };

  const ruleGroup1= {
    _key: keygenerator(),
    logic:"and",
    ruleConditions:[]
  };
  ruleGroup1.ruleConditions.push(ruleCondition);
  ruleGroup1.ruleConditions.push(ruleCondition2);
  ruleGroup1.ruleConditions.push(ruleCondition3);
  ///////
  const ruleCondition21 = {
    _key: keygenerator(),
    logic:"and",
    variable:"1",
    operator:"gt",
    value:"9"
  };

  const ruleGroup2= {
    _key: keygenerator(),
    logic:"and",
    ruleConditions:[]
  };
  ruleGroup2.ruleConditions.push(ruleCondition21);
  //////
  const rule = [];
  rule.push(ruleGroup1);
  rule.push(ruleGroup2);
  ///

  const [ruleData, setRuleData] = useState(rule);
  const forceUpdate = useForceUpdate();

  const onRuleChange = (changedRule) =>{
    setRuleData(changedRule);
  };

  const onFinish = () => {
    console.log('Success:', rule);
    console.log('Success:', ruleData);
  };

  const arrData = [];
  arrData.push({_id:123, value:'aa'});
  arrData.push({_id:223, value:'bb'});
  arrData.push({_id:323, value:'cc'});

  const [arrayData, setArrayData] = useState(arrData);

  const onDataChange = (newArrData) => {
    setArrayData([...newArrData]);
    // forceUpdate();
  }

  return (
    <PageContainer content="策略编辑" className={styles.main}>
      {/* <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large" />
      </div> */}
          <Rule 
            variables={variables}
            operators={operators}
            logicOps={logicOps}
            rule={ruleData}
            onChange={onRuleChange}
          />
          <Divider> Process Action </Divider>
          <Button type="primary" htmlType="submit" onClick={onFinish}>
            Submit
          </Button>
          {/* <Container arrData={arrayData} onChange = {onDataChange}/> */}

    </PageContainer>
  );
};
