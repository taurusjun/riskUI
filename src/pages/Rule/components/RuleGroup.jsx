import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Text,
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
} from 'antd';
import React, { useState, useEffect } from 'react';
// import styles from '../style.less';
import SingleRule from './SingleRule';
import SingleLogic from './SingleLogic';
import styles from './index.less';
import { keygenerator } from './Keygenerator';
import { connectLines } from './DOMConnector';

const RuleGroup = ({
  variables,
  operators,
  logicOps,
  ruleGroup,
  showHeadMinus,
  onChange,
  onDelete,
}) => {
  const [ruleGrp, setRuleGrp] = useState(ruleGroup);
  const [posArray, setArray] = useState([]);

  const triggerChange = (changedValue) => {
    setArray([]);
    onChange?.(changedValue);
  };

  const onSingleRuleChange = (index, changedSingleRule) => {
    let ruleGrpCopy = Object.assign([], ruleGrp);
    ruleGrpCopy[index] = changedSingleRule;
    setRuleGrp(ruleGrpCopy);
    triggerChange(ruleGrpCopy);
  };

  const onSingleRuleDelete = (index, event) => {
    let ruleGrpCopy = Object.assign([], ruleGrp);
    ruleGrpCopy.splice(index, 1);

    setRuleGrp(ruleGrpCopy);
    triggerChange(ruleGrpCopy);
  };

  const onGrpLogicChange = (index, changedLogic) => {
    let ruleGrpCopy = Object.assign([], ruleGrp);
    ruleGrpCopy[index].logicCode = changedLogic;

    setRuleGrp(ruleGrpCopy);
    triggerChange(ruleGrpCopy);
  };

  const addNewRuleCondtion = (event) => {
    let newRuleCondition = [...ruleGrp, { _key: keygenerator() }];
    setRuleGrp(newRuleCondition);
    triggerChange(newRuleCondition);
  };

  const OnDeleteRuleGroup = (e) => {
    onDelete?.(e);
  };

  /////  calculate line position //////
  const condBaseKey = ruleGrp[0]._key;

  const calcNthPos = (conditionIndex) => {
    let ele1 = document.getElementById('cond-base' + condBaseKey);
    let ele2 = document.getElementById('c' + condBaseKey + '_' + conditionIndex);
    let ele3 = document.getElementById('co' + condBaseKey + '_' + conditionIndex);
    return connectLines(ele1, ele2, ele3);
  };

  ///////
  // user effect to render lines
  useEffect(() => {
    let conditions = ruleGrp.length;
    let newPosArray = [];
    for (let i = 1; i < conditions; i++) {
      newPosArray[i] = calcNthPos(i);
    }
    setArray(newPosArray);
  }, [ruleGrp]);

  const ruleGroupHtml = [];
  for (let i = 0; i < ruleGrp.length; i++) {
    let condtion = ruleGrp[i];
    let showMinus = false;
    if (i != 0) {
      ruleGroupHtml.push(
        <Row gutter={8} style={{ margin: 10 }}>
          <Col>
            <div
              id={'co' + condBaseKey + '_' + i}
              style={{
                padding: 0,
                marginTop: posArray[i] && posArray[i].marginTop + 2,
                marginLeft: posArray[i] && posArray[i].marginLeft - 2,
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
      showMinus = true;
    }
    ruleGroupHtml.push(
      <Row gutter={8} style={{ margin: 10 }}>
        <Col>
          {i == 0 && (
            <>
              <div
                id={'cond-base' + condBaseKey}
                style={{
                  padding: 0,
                  margin: 0,
                  height: 2,
                  backgroundColor: 'blue',
                  lineHeight: 1,
                  width: 150,
                  display: 'inline-block',
                }}
              />
            </>
          )}
          {i != 0 && (
            <>
              <div
                id={'c' + condBaseKey + '_' + i}
                style={{
                  padding: 0,
                  margin: 0,
                  height: 2,
                  backgroundColor: 'blue',
                  lineHeight: 1,
                  width: 20,
                  marginLeft: 0,
                  display: 'inline-block',
                  // transform:'rotate(90deg)'
                }}
              />
              <div style={{ display: 'inline-block' }}>
                <SingleLogic
                  key={condtion._key}
                  logicOps={logicOps}
                  logic={condtion.logicCode}
                  onChange={(e) => onGrpLogicChange(i, e)}
                />
              </div>
              <div
                style={{
                  padding: 0,
                  margin: 0,
                  height: 2,
                  backgroundColor: 'blue',
                  lineHeight: 1,
                  width: 50,
                  display: 'inline-block',
                }}
              />
            </>
          )}
          <div style={{ borderStyle: 'dotted', padding: 5, display: 'inline-block' }}>
            <SingleRule
              key={condtion._key}
              variables={variables}
              operators={operators}
              ruleCondition={condtion}
              showMinus={showMinus}
              onChange={(e) => onSingleRuleChange(i, e)}
              onDelete={(e) => onSingleRuleDelete(i, e)}
            />
          </div>
        </Col>
      </Row>,
    );
  }

  return (
    <>
      <Card
        title={
          <div>
            Rule Group
            {showHeadMinus && (
              <Button
                type="primary"
                shape="circle"
                icon={<MinusOutlined />}
                onClick={OnDeleteRuleGroup}
                style={{ marginLeft: 10 }}
              />
            )}
          </div>
        }
        bordered={true}
      >
        {ruleGroupHtml}
        <Row gutter={16} style={{ margin: 10 }}>
          <Col span={24}>
            <Button
              type="primary"
              block
              icon={<PlusOutlined />}
              onClick={(e) => addNewRuleCondtion(e)}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default RuleGroup;
