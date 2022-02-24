import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button, Divider } from 'antd';
import styles from './index.less';
import Rule from './components/Rule';
import { useForceUpdate } from './components/useForceUpdate';
import { keygenerator } from './components/Keygenerator';
import { ruleEditPageInfo, rulechange } from './service';
import { useRequest } from 'umi';

export default () => {
  const {
    error,
    loading,
    data: data,
  } = useRequest(() => ruleEditPageInfo({ uuid: '96668402-87fc-11ec-a8a3-0242ac120002' }));

  const rule = loading ? {} : data.rule;
  const ruleGroups = loading ? [] : rule.ruleGroups;
  //add '_key' property for all element
  //'_key' would be used in component 'key' property
  ruleGroups?.forEach((group) => {
    group._key = keygenerator();
    group.ruleConditions.forEach((condition) => {
      condition._key = keygenerator();
    });
  });

  const logicOpsJson = {
    OR: 'OR',
    AND: 'AND',
  };
  const logicOps = new Map(Object.entries(logicOpsJson));
  ///////

  const onRuleChange = (changedRule) => {
    rule.ruleGroups = changedRule;
  };

  const onFinish = () => {
    let data = JSON.stringify(rule);
    console.log('rule:', data);
    rulechange(rule);
  };

  return (
    <PageContainer content="策略编辑" className={styles.main}>
      <div
      // style={{
      //   paddingTop: 100,
      //   textAlign: 'center',
      // }}
      >
        <Spin spinning={loading} size="large" delay={300}>
          {!loading && (
            <>
              <Rule
                variables={data.variablesArray}
                operators={data.operatorsArray}
                logicOps={logicOps}
                rule={ruleGroups}
                onChange={onRuleChange}
              />
              <Divider> Process Action </Divider>
              <Button type="primary" htmlType="submit" onClick={onFinish}>
                Submit
              </Button>
            </>
          )}
        </Spin>
      </div>
    </PageContainer>
  );
};
