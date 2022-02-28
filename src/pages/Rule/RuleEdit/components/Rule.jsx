import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Text, Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import SingleRule from './SingleRule';
import SingleLogic from './SingleLogic';
import RuleGroup from './RuleGroup';
import styles from './index.less';
import { keygenerator } from './Keygenerator';

const Rule = ({ variables, operators, logicOps, rule, onChange }) => {
  const [rle, setRle] = useState(rule);
  const [posArray, setArray] = useState([]);

  const triggerChange = (changedValue) => {
    setArray([]);
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
  ///
  const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.pageXOffset,
      top: rect.top + window.pageYOffset,
      // left: rect.left + window.pageXOffset,
      // top: rect.top + window.pageYOffset,
      bottom: rect.bottom + window.pageXOffset,
      right: rect.right + window.pageYOffset,
      width: rect.width || el.offsetWidth,
      height: rect.height || el.offsetHeight,
    };
  };

  const calcNthPos = (groupIndex) => {
    let ele1 = document.getElementById('base');
    let ele2 = document.getElementById('g' + groupIndex);
    let ele3 = document.getElementById('o' + groupIndex);
    let d1 = getOffset(ele1);
    let d2 = getOffset(ele2);
    let o = getOffset(ele3);
    let thickness = 2;
    let width = d2.bottom - d1.bottom;

    let cy = (d1.bottom + d2.bottom) / 2 - thickness / 2;
    let cx = d2.left - width / 2;

    let ox = o.left;
    let oy = o.bottom;

    let marginTop = cy - oy;
    let marginLeft = cx - ox;

    return {
      width: width,
      marginTop: marginTop,
      marginLeft: marginLeft,
      angle: 90,
    };
  };

  useEffect(() => {
    let groups = rle.length;
    let newPosArray = [];
    for (let i = 1; i < groups; i++) {
      newPosArray[i] = calcNthPos(i);
    }
    setArray(newPosArray);
  }, [rle]);

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
                id="base"
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
                id={'g' + i}
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
      {/* <div
        id="test11"
        style={{
          padding: '0px',
          margin: '0px',
          height: '2px',
          backgroundColor: 'red',
          lineHeight: '1px',
          position: 'absolute',
          left: 231.4296875,
          top: 477.5703125,
          width: 249.140625,
          transform: 'rotate(90deg)',
        }}
      /> */}
    </>
  );
};

export default Rule;
