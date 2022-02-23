import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button, Divider } from 'antd';
import styles from './index.less';
import Rule from './components/Rule';
import { useForceUpdate } from './components/useForceUpdate';
import { keygenerator } from './components/Keygenerator';
import { rulequery } from './service';
import { useRequest } from 'umi';

export default () => {
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  const [mydata, setMydata] = useState({ ruleGroups: [] });
  const { error, loading, data: qrule } = useRequest(rulequery);
  if (error) return <div>error...</div>;
  if (loading) return <div>Loading...</div>;
  // useEffect(() => {
  //   setMydata(qrule);
  // }, [qrule]);
  //const localRule = qrule
  // const [ruleData, setRuleData] = useState(qrule.ruleGroups);
  ///////
  const variablesJson = {
    1: 'Not Identified',
    2: 'Closed',
    3: 'C33333',
  };

  const variables = new Map(Object.entries(variablesJson));

  const operatorsJson = {
    eq: '==',
    gt: '>',
    contains: '{}',
    lt: '<',
  };

  const operators = new Map(Object.entries(operatorsJson));

  const logicOpsJson = {
    or: 'OR',
    and: 'AND',
  };
  const logicOps = new Map(Object.entries(logicOpsJson));
  ///////
  const ruleCondition = {
    _key: keygenerator(),
    logicCode: 'and',
    leftId: '2',
    operatorCode: 'gt',
    rightValue: '999',
  };

  const ruleCondition2 = {
    _key: keygenerator(),
    logicCode: 'or',
    leftId: '1',
    operatorCode: 'eq',
    rightValue: '888',
  };

  const ruleCondition3 = {
    _key: keygenerator(),
    logicCode: 'or',
    leftId: '2',
    operatorCode: 'gt',
    rightValue: '777',
  };

  const ruleGroup1 = {
    _key: keygenerator(),
    logicCode: 'and',
    ruleConditions: [],
  };
  ruleGroup1.ruleConditions.push(ruleCondition);
  ruleGroup1.ruleConditions.push(ruleCondition2);
  ruleGroup1.ruleConditions.push(ruleCondition3);
  ///////
  const ruleCondition21 = {
    _key: keygenerator(),
    logicCode: 'and',
    leftId: '1',
    operatorCode: 'gt',
    rightValue: '9',
  };

  const ruleGroup2 = {
    _key: keygenerator(),
    logicCode: 'and',
    ruleConditions: [],
  };
  ruleGroup2.ruleConditions.push(ruleCondition21);
  //////
  const rule = [];
  rule.push(ruleGroup1);
  rule.push(ruleGroup2);
  ///
  // const [mydata, setMydata] = useState({ruleGroups:[]});
  // const [ruleData, setRuleData] = useState([]);
  // const { loading, data: qrule } = useRequest(rulequery);
  // if(loading) return (<div>Loading...</div>)
  // useEffect(() => {
  //   setMydata(qrule);
  // }, []);

  // rule = mydata.ruleGroups
  // const [ruleData, setRuleData] = useState(rule);
  // const [ruleData, setRuleData] = useState(mydata.ruleGroups);
  // const forceUpdate = useForceUpdate();

  const onRuleChange = (changedRule) => {
    // setRuleData(changedRule);
    qrule.ruleGroups = changedRule;
  };

  const onFinish = () => {
    console.log('ruleGroups:', qrule);
  };

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
        rule={qrule.ruleGroups}
        // rule={ruleData}
        onChange={onRuleChange}
      />
      <Divider> Process Action </Divider>
      <Button type="primary" htmlType="submit" onClick={onFinish}>
        Submit
      </Button>
    </PageContainer>
  );
};
