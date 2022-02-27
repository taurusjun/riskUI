import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Text, Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button } from 'antd';
import React, { useState } from 'react';
import SingleRule from './SingleRule';
import SingleLogic from './SingleLogic';
import RuleGroup from './RuleGroup';
import styles from './index.less';
import { keygenerator } from './Keygenerator';

const Rule = ({ variables, operators, logicOps, rule, onChange }) => {
  const [rle, setRle] = useState(rule);

  const triggerChange = (changedValue) => {
    onChange?.(changedValue);
  };

  const onRuleGroupChange = (index, changedRuleConditions) => {
    let rleCopy = Object.assign([], rle);
    rleCopy[index].ruleConditions = changedRuleConditions;

    setRle(rleCopy);
    triggerChange(rleCopy);
  };

  const onRuleGroupDelete = (index) => {
    let rleCopy = Object.assign([], rle);
    rleCopy.splice(index, 1);

    setRle(rleCopy);
    triggerChange(rleCopy);
  };

  const onLogicChange = (index, changedLogic) => {
    let rleCopy = Object.assign([], rle);
    rleCopy[index].logicCode = changedLogic;

    setRle(rleCopy);
    triggerChange(rleCopy);
  };

  const addNewRuleGroup = (e) => {
    let newRuleCondition = {
      _key: keygenerator(),
      logicCode: 'and',
    };
    let newRuleGrp = {
      _key: keygenerator(),
      logicCode: 'and',
      ruleConditions: [],
    };

    newRuleGrp.ruleConditions.push(newRuleCondition);
    let rleCopy = Object.assign([], rle);
    rleCopy.push(newRuleGrp);

    setRle(rleCopy);
    triggerChange(rleCopy);
  };

  ////
  const ruleHtml = [];
  for (let i = 0; i < rle.length; i++) {
    let group = rle[i];
    let showHeadMinus = false;
    if (i != 0) {
      ruleHtml.push(
        <Row style={{ marginTop: 20 }}>
          <Col>
            <div
              style={{
                padding: 0,
                marginTop: 30,
                height: 2,
                backgroundColor: 'blue',
                lineHeight: 1,
                width: 280,
                transform: 'rotate(270deg) translateY(-70px) translateX(108px)',
              }}
            />
          </Col>
        </Row>,
      );
      showHeadMinus = true;
    }
    ruleHtml.push(
      <Row align="middle">
        <Col span={24}>
          {i == 0 && (
            <>
              <div
                style={{
                  padding: 0,
                  marginTop: 30,
                  height: 2,
                  backgroundColor: 'blue',
                  lineHeight: 1,
                  width: 200,
                  verticalAlign: 'top',
                  display: 'inline-block',
                }}
              />
            </>
          )}
          {i != 0 && (
            <>
              <div
                style={{
                  padding: 0,
                  marginTop: 30,
                  height: 2,
                  backgroundColor: 'blue',
                  lineHeight: 1,
                  width: 30,
                  marginLeft: 70,
                  verticalAlign: 'top',
                  display: 'inline-block',
                  // transform:'rotate(90deg)'
                }}
              />
              <div
                style={{
                  marginTop: 15,
                  display: 'inline-block',
                  verticalAlign: 'top',
                }}
              >
                <SingleLogic
                  key={group._key}
                  logicOps={logicOps}
                  logic={group.logicCode}
                  onChange={(e) => onLogicChange(i, e)}
                />
              </div>
            </>
          )}
          <div
            style={{
              padding: 0,
              marginTop: 30,
              height: 2,
              backgroundColor: 'blue',
              lineHeight: 1,
              width: 50,
              display: 'inline-block',
              verticalAlign: 'top',
            }}
          />
          <div style={{ borderStyle: 'dotted', padding: 5, display: 'inline-block' }}>
            <RuleGroup
              key={group._key}
              variables={variables}
              operators={operators}
              logicOps={logicOps}
              ruleGroup={group.ruleConditions}
              showHeadMinus={showHeadMinus}
              onChange={(e) => onRuleGroupChange(i, e)}
              onDelete={(e) => onRuleGroupDelete(i, e)}
            />
          </div>
        </Col>
      </Row>,
    );
  }

  ////
  return (
    <>
      <Card
        title={
          <div>
            Rule{' '}
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={addNewRuleGroup}
            />
          </div>
        }
        className={styles.card}
        bordered={false}
      >
        <Row align="middle">
          <div className={styles.border_less_wrapper}>{ruleHtml}</div>
        </Row>
      </Card>
    </>
  );
};

export default Rule;
