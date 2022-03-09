import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import {
  MinusOutlined,
  PlusOutlined,
  ApartmentOutlined,
  PartitionOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import {
  Select,
  Input,
  Form,
  Spin,
  Card,
  Col,
  Popover,
  Row,
  message,
  Button,
  Divider,
  Tabs,
} from 'antd';
import styles from './index.less';
import ComplexRuleLogic from '../components/ComplexRuleLogic';
import RuleAction from '../components/RuleAction';
import { useForceUpdate } from '../components/useForceUpdate';
import { keygenerator } from '../components/Keygenerator';
import { ruleEditPageInfo, rulechange, ruleEditPageAction } from '../service';
import { useRequest } from 'umi';
import { useParams } from 'umi';

export default (props) => {
  const params = useParams();
  const ruleUUID = params.uuid;
  const {
    error,
    loading,
    run,
    data: data,
  } = useRequest(() => ruleEditPageInfo({ uuid: ruleUUID }));

  const ruleLogic = loading ? {} : data.ruleLogic;
  // const [rule, setRule] = useState(loading ? {} : data.rule);
  const ruleGroups = loading ? [] : ruleLogic.ruleGroups;
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
    ruleLogic.ruleGroups = changedRuleGroups;
  };

  ////////
  const onCodeChange = (e) => {
    let newCodeValue = e.target.value;
    ruleLogic.code = newCodeValue;
  };

  const onNameChange = (e) => {
    let newValue = e.target.value;
    ruleLogic.name = newValue;
  };

  const onDescriptionChange = (e) => {
    let newValue = e.target.value;
    ruleLogic.description = newValue;
  };

  ////
  const onTabChange = async (activeKey) => {
    if (activeKey == '2') {
      console.log(activeKey);
      // try {
      //   const { data } = await ruleEditPageAction({ uuid: ruleUUID });
      //   console.log(data);
      // } catch (error) {}
    }
  };

  ///////

  const onFinish = async () => {
    try {
      await rulechange(ruleLogic);
      run();
    } catch (error) {}
  };

  ///////
  const actionOpts = [1];

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
                            defaultValue={ruleLogic.code}
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
                            defaultValue={ruleLogic.name}
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
                            defaultValue={ruleLogic.description}
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
              <Divider />
              <div className={styles.card_container}>
                <Tabs type="card" defaultActiveKey="1" onChange={onTabChange}>
                  <Tabs.TabPane
                    tab={
                      <span style={{ fontSize: 16 }}>
                        <PartitionOutlined />
                        Complex Rule Logic
                      </span>
                    }
                    key="1"
                  >
                    <div>
                      <ComplexRuleLogic
                        variables={data.variablesArray}
                        operators={data.operatorsArray}
                        logicOps={logicOps}
                        rule={ruleLogic.ruleGroups}
                        onChange={onRuleGroupsChange}
                      />
                      <Button type="primary" htmlType="submit" onClick={onFinish}>
                        Submit
                      </Button>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab={
                      <span style={{ fontSize: 16 }}>
                        <ThunderboltOutlined />
                        Rule Actions
                      </span>
                    }
                    key="2"
                  >
                    <div style={{ paddingLeft: 25 }}>
                      <div>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 500,
                            borderBottom: 'solid 1px',
                            width: 500,
                          }}
                        >
                          Rule is <span style={{ color: 'red' }}>True</span>
                        </div>
                        <div style={{ padding: 10, width: 800 }}>
                          <RuleAction
                            ruleActionArray={data.ruleAction.ruleIsTrueActions}
                            actionDefs={data.actionDefs}
                            tagDict={data.tagDict}
                          />
                        </div>
                      </div>
                      <div style={{ marginTop: 50 }}>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 500,
                            borderBottom: 'solid 1px',
                            width: 500,
                          }}
                        >
                          Rule is <span style={{ color: 'red' }}>False</span>
                        </div>
                        <div style={{ padding: 10, width: 800 }}>
                          <RuleAction
                            ruleActionArray={data.ruleAction.ruleIsFalseActions}
                            actionDefs={data.actionDefs}
                            tagDict={data.tagDict}
                          />
                        </div>
                      </div>
                    </div>
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </>
          )}
        </Spin>
      </div>
    </PageContainer>
  );
};
