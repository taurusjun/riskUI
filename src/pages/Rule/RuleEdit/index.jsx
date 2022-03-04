import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button, Divider } from 'antd';
import styles from './index.less';
import ComplexRuleLogic from '../components/ComplexRuleLogic';
import { useForceUpdate } from '../components/useForceUpdate';
import { keygenerator } from '../components/Keygenerator';
import { ruleEditPageInfo, rulechange } from '../service';
import { useRequest } from 'umi';
import { useParams } from 'umi';

export default (props) => {
  const params = useParams();
  const {
    error,
    loading,
    run,
    data: data,
  } = useRequest(() => ruleEditPageInfo({ uuid: params.uuid }));

  const rule = loading ? {} : data.rule;
  // const [rule, setRule] = useState(loading ? {} : data.rule);
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

  const onRuleGroupsChange = (changedRuleGroups) => {
    // console.log('rule:');
    // console.log(rule);
    // console.log('changedRule:');
    // console.log(changedRuleGroups);
    rule.ruleGroups = changedRuleGroups;
  };

  ////////
  const onCodeChange = (e) => {
    let newCodeValue = e.target.value;
    rule.code = newCodeValue;
  };

  const onNameChange = (e) => {
    let newValue = e.target.value;
    rule.name = newValue;
  };

  const onDescriptionChange = (e) => {
    let newValue = e.target.value;
    rule.description = newValue;
  };

  ///////

  const onFinish = async () => {
    try {
      await rulechange(rule);
      run();
    } catch (error) {}
  };

  return (
    <PageContainer className={styles.main}>
      <div>
        <Spin spinning={loading} size="large" delay={300}>
          {!loading && (
            <>
              <div style={{ marginBottom: 20 }}>
                <Card title={<div>Base Info </div>} className={styles.card} bordered={false}>
                  <Row gutter={10}>
                    <Col>
                      <div style={{ paddingLeft: 25, paddingRight: 12 }}>
                        <label style={{ display: 'inline-block', fontSize: 16, fontWeight: 500 }}>
                          Code
                        </label>
                        <div style={{ display: 'inline-block', padding: 10, fontSize: 16 }}>
                          <input
                            name="ruleCode"
                            key="ruleCode"
                            defaultValue={rule.code}
                            onChange={onCodeChange}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div style={{ paddingLeft: 25, paddingRight: 12 }}>
                        <label style={{ display: 'inline-block', fontSize: 16, fontWeight: 500 }}>
                          Name
                        </label>
                        <div style={{ display: 'inline-block', padding: 10, fontSize: 16 }}>
                          <input
                            name="ruleName"
                            key="ruleName"
                            defaultValue={rule.name}
                            onChange={onNameChange}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ paddingLeft: 25, paddingRight: 12 }}>
                        <label style={{ display: 'inline-block', fontSize: 16, fontWeight: 500 }}>
                          Description
                        </label>
                        <div style={{ display: 'inline-block', padding: 10, fontSize: 16 }}>
                          <input
                            name="ruleDescription"
                            key="ruleDescription"
                            style={{ width: 400 }}
                            defaultValue={rule.description}
                            onChange={onDescriptionChange}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24}>
                      <div style={{ paddingLeft: 25, paddingRight: 12 }}>
                        <label style={{ display: 'inline-block', fontSize: 16, fontWeight: 500 }}>
                          Apply to Events:
                        </label>
                        <div
                          style={{
                            display: 'inline-block',
                            padding: 10,
                            fontSize: 16,
                            width: '50%',
                          }}
                        >
                          <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            defaultValue={['payment', 'return']}
                            // onChange={handleChange}
                          ></Select>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
              <div>
                <ComplexRuleLogic
                  variables={data.variablesArray}
                  operators={data.operatorsArray}
                  logicOps={logicOps}
                  rule={rule.ruleGroups}
                  onChange={onRuleGroupsChange}
                />
                <Button type="primary" htmlType="submit" onClick={onFinish}>
                  Submit
                </Button>
              </div>
              <Divider> Process Action </Divider>
            </>
          )}
        </Spin>
      </div>
    </PageContainer>
  );
};
