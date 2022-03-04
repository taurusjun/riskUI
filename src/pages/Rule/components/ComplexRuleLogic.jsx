import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Text, Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import SingleRule from './SingleRule';
import SingleLogic from './SingleLogic';
import RuleGroup from './RuleGroup';
import styles from './index.less';
import { keygenerator } from './Keygenerator';
import { connectLines } from './DOMConnector';

const ComplexRuleLogic = ({ variables, operators, logicOps, rule: ruleGroups, onChange }) => {
  const [rleGroups, setRleGroups] = useState(ruleGroups);
  const [posArray, setArray] = useState([]);

  const triggerChange = (changedValue) => {
    setArray([]);
    onChange?.(changedValue);
  };

  const onRuleGroupChange = (index, changedRuleConditions) => {
    let rleGroupsCopy = Object.assign([], rleGroups);
    rleGroupsCopy[index].ruleConditions = changedRuleConditions;
    setRleGroups(rleGroupsCopy);
    triggerChange(rleGroupsCopy);
  };

  const onRuleGroupDelete = (index) => {
    let rleGroupsCopy = Object.assign([], rleGroups);
    rleGroupsCopy.splice(index, 1);
    setRleGroups(rleGroupsCopy);
    triggerChange(rleGroupsCopy);
  };

  const onLogicChange = (index, changedLogic) => {
    let rleGroupsCopy = Object.assign([], rleGroups);
    rleGroupsCopy[index].logicCode = changedLogic;
    setRleGroups(rleGroupsCopy);
    triggerChange(rleGroupsCopy);
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
    let rleGroupsCopy = Object.assign([], rleGroups);
    rleGroupsCopy.push(newRuleGrp);
    setRleGroups(rleGroupsCopy);
    triggerChange(rleGroupsCopy);
  };

  const onCodeChange = (e) => {
    let newCodeValue = e.target.value;
    ruleGroups.code = newCodeValue;
    triggerChange(ruleGroups);
  };

  const onNameChange = (e) => {
    let newValue = e.target.value;
    ruleGroups.name = newValue;
    triggerChange(ruleGroups);
  };

  const onDescriptionChange = (e) => {
    let newValue = e.target.value;
    ruleGroups.description = newValue;
    triggerChange(ruleGroups);
  };

  /////  calculate line position //////
  const calcNthPos = (groupIndex) => {
    let ele1 = document.getElementById('grp-base');
    let ele2 = document.getElementById('g' + groupIndex);
    let ele3 = document.getElementById('o' + groupIndex);
    return connectLines(ele1, ele2, ele3);
  };

  ///////
  // user effect to render lines
  useEffect(() => {
    let groups = rleGroups.length;
    let newPosArray = [];
    for (let i = 1; i < groups; i++) {
      newPosArray[i] = calcNthPos(i);
    }
    setArray(newPosArray);
  }, [rleGroups]);

  ////
  const ruleHtml = [];
  for (let i = 0; i < rleGroups.length; i++) {
    let group = rleGroups[i];
    let showHeadMinus = false;
    if (i != 0) {
      ruleHtml.push(
        <Row style={{ marginTop: 20 }}>
          <Col>
            <div
              id={'o' + i}
              style={{
                padding: 0,
                marginTop: posArray[i] && posArray[i].marginTop,
                marginLeft: posArray[i] && posArray[i].marginLeft,
                height: 2,
                backgroundColor: 'blue',
                lineHeight: 1,
                width: posArray[i] && posArray[i].width,
                transform: posArray[i] && 'rotate(' + posArray[i].angle + 'deg)',
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
                id="grp-base"
                style={{
                  padding: 0,
                  marginTop: 30,
                  height: 2,
                  backgroundColor: 'blue',
                  lineHeight: 1,
                  width: 50,
                  verticalAlign: 'top',
                  display: 'inline-block',
                }}
              />
              <div
                style={{
                  padding: 0,
                  marginTop: 30,
                  height: 2,
                  backgroundColor: 'blue',
                  lineHeight: 1,
                  width: 100,
                  verticalAlign: 'top',
                  display: 'inline-block',
                }}
              />
            </>
          )}
          {i != 0 && (
            <>
              <div
                id={'g' + i}
                style={{
                  padding: 0,
                  marginTop: 30,
                  height: 2,
                  backgroundColor: 'blue',
                  lineHeight: 1,
                  width: 20,
                  marginLeft: 30,
                  verticalAlign: 'top',
                  display: 'inline-block',
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
    <div className={styles.border_less_wrapper}>
      <div>
        <Card
          title={
            <div>
              Rule Logic{' '}
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
      </div>
    </div>
  );
};

export default ComplexRuleLogic;
