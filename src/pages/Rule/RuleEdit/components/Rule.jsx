import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Text, Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button } from 'antd';
import React, { useState } from 'react';
import SingleRule from './SingleRule';
import SingleLogic from './SingleLogic'
import RuleGroup from './RuleGroup';
import styles from './index.less';
import { keygenerator } from './Keygenerator';

const Rule = ({variables, operators, logicOps, rule, onChange}) => {
  const [rle, setRle] = useState(rule);

  const triggerChange = (changedValue) => {
    onChange?.(
      changedValue,
    );
  };

  const onRuleGroupChange = (index, changedRuleConditions)=>{
    let rleCopy = Object.assign([], rle);
    rleCopy[index].ruleConditions = changedRuleConditions;

    setRle(rleCopy);
    triggerChange(rleCopy);
  }
  
  const onRuleGroupDelete = (index)=>{
    let rleCopy = Object.assign([], rle);
    rleCopy.splice(index,1);

    setRle(rleCopy);
    triggerChange(rleCopy);
  }

  const onLogicChange = (index, changedLogic)=>{
    let rleCopy = Object.assign([], rle);
    rleCopy[index].logicCode = changedLogic;

    setRle(rleCopy);
    triggerChange(rleCopy);
  }

  const addNewRuleGroup = (e)=>{
    let newRuleCondition = {
      _key: keygenerator(),
      logicCode:"and",
    };
    let newRuleGrp = {
      _key: keygenerator(),
      logicCode:"and", ruleConditions:[]
    };

    newRuleGrp.ruleConditions.push(newRuleCondition);
    let rleCopy = Object.assign([], rle);
    rleCopy.push(newRuleGrp);

    setRle(rleCopy);
    triggerChange(rleCopy);
  }

  ////
  const ruleHtml = [];
  for(let i=0; i < rle.length; i++){
    let group = rle[i];
    let showHeadMinus = false;
    if(i!=0){
      ruleHtml.push(
        <Row style={{ marginTop: 24 }}>
        <Col>
        <SingleLogic 
          key={group._key} 
          logicOps={logicOps} 
          logic={group.logicCode}
          onChange={e=>onLogicChange(i, e)}
          />
        </Col>
      </Row>
      );  
      showHeadMinus= true;
    }
    ruleHtml.push(
      <Row>
      <Col span={24}>
        <RuleGroup 
          key={group._key} 
          variables={variables}
          operators={operators}
          logicOps={logicOps}
          ruleGroup={group.ruleConditions}
          showHeadMinus={showHeadMinus}
          onChange={e=>onRuleGroupChange(i, e)}
          onDelete={e=>onRuleGroupDelete(i, e)}
        />
      </Col>
    </Row>
    );
  }

  ////
  return (
    <>
      <Card title={<div>Rule <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={addNewRuleGroup}/>
</div>} className={styles.card} bordered={false}>
        <Row align='middle' justify='center'>
          <div className={styles.border_less_wrapper}>
            {ruleHtml}
          </div>
        </Row>
      </Card>
      </>
  );
};


export default Rule;
