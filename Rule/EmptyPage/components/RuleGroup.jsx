import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Text, Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button, Divider } from 'antd';
import React, { useState, setState } from 'react';
// import styles from '../style.less';
import SingleRule from './SingleRule';
import SingleLogic from './SingleLogic'
import styles from './index.less';
import { keygenerator } from './Keygenerator';

const RuleGroup = ({variables, operators, logicOps, ruleGroup, showHeadMinus, onChange, onDelete}) => {
  const [ruleGrp, setRuleGrp] = useState(ruleGroup);

  const triggerChange = (changedValue) => {
    onChange?.(
      changedValue,
    );
  };

  const onSingleRuleChange = (index, changedSingleRule)=>{
    let ruleGrpCopy = Object.assign([], ruleGrp);
    ruleGrpCopy[index] = changedSingleRule;
    setRuleGrp(ruleGrpCopy);
    triggerChange(ruleGrpCopy);
  }

  const onSingleRuleDelete = (index, event)=>{
    let ruleGrpCopy = Object.assign([], ruleGrp);
    ruleGrpCopy.splice(index, 1);

    setRuleGrp(ruleGrpCopy);
    triggerChange(ruleGrpCopy);
  }

  const onGrpLogicChange = (index, changedLogic)=>{
    let ruleGrpCopy = Object.assign([], ruleGrp);
    ruleGrpCopy[index].logic = changedLogic;

    setRuleGrp(ruleGrpCopy);
    triggerChange(ruleGrpCopy);
  }

  const addNewRuleCondtion = (event)=>{
    let newRuleCondition = [...ruleGrp, {_key: keygenerator()}];
    setRuleGrp(newRuleCondition);
    triggerChange(newRuleCondition);
  };

  const OnDeleteRuleGroup = (e)=>{
    onDelete?.(e);
  }

  const ruleGroupHtml = [];
  for(let i=0; i <ruleGrp.length; i++){
    let condtion = ruleGrp[i];
    let showMinus = false;
    if(i!=0){
      ruleGroupHtml.push(
        <Row gutter={16} style={{ margin: 10 }}>
        <Col>
          <SingleLogic 
            key={condtion._key} 
            logicOps={logicOps}
            logic={condtion.logic}
            onChange={e=>onGrpLogicChange(i, e)}
            />
        </Col>
      </Row>
      );
      showMinus = true;
    }
    ruleGroupHtml.push(
      <Row gutter={16} style={{ margin: 10 }}>
      <SingleRule
        key={condtion._key} 
        variables={variables}
        operators={operators}
        ruleCondition={condtion}
        showMinus={showMinus}
        onChange={e=>onSingleRuleChange(i, e)}
        onDelete={e=>onSingleRuleDelete(i, e)}        
      />
    </Row>
    );
  }

  return (
    <>
    {/* <div>Rule Condition</div>
    <div style={{border:'1px solid', padding:'20px'}}> */}
    <Card title={<div>Rule Group 
        { showHeadMinus && <Button type="primary" shape="circle" icon={<MinusOutlined />} onClick={OnDeleteRuleGroup} style={{marginLeft:10}}/>}
      </div>} bordered={true}>
        {/* <Row gutter={16} justify="center">
          <Col span={6} textAlign="center">
              变量
          </Col>
          <Col span={6}>
              操作符
          </Col>
          <Col span={6}>
              比较值
          </Col>
          <Col span={4}>
          </Col>
        </Row> */}
        {ruleGroupHtml}
        <Row gutter={16} justify="center" style={{ margin: 10 }}>
          <Col span={24}>
            <Button
                type="primary"
                block
                // shape="circle"
                icon={<PlusOutlined />}
                onClick={(e)=>addNewRuleCondtion(e)}
              />
          </Col>
        </Row>
    </Card>    
      {/* </div>     */}
      </>
  );
};


export default RuleGroup;
