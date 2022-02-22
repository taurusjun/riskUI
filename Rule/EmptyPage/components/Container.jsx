import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Text, Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button, Divider } from 'antd';
import { now } from 'lodash';
import React, { useState, setState } from 'react';
import SingleElement from './SingleElement';
// import { v4 as uuidv4 } from '@types/uuid';
import { keygenerator } from './Keygenerator';

const Container = ({arrData, onChange}) => {

  const triggerChange = (changedValue) => {
    onChange?.(
      changedValue,
    );
  };

  // const [arr, setArr] = useState(arrData);

  const onSingleRuleDelete = (index, event)=>{
    const tmp = [...arrData];
    tmp.splice(index, 1);
    // setArr(tmp);
    // setRuleGrp(ruleGrpCopy);
    triggerChange(tmp);
  }

  const ruleGroupGen = (data, i) =>{
    return <>
      <Row gutter={16} style={{ margin: 10 }}>
      <SingleElement
        key={keygenerator()}
        data={data.value}
        onDelete={e=>onSingleRuleDelete(i, e)}        
      />
    </Row>
    </>
  }

  // const ruleGroupHtml = [];
  // for(let i=0; i <arr.length; i++){
  //   let data = arr[i];
  //   ruleGroupHtml.push(
  //     <Row gutter={16} style={{ margin: 10 }}>
  //         <SingleElement
  //           key={i} 
  //           data={data}
  //           onDelete={e=>onSingleRuleDelete(i, e)}        
  //         />
  //   </Row>
  //   );
  // }

  return (
    <>
    {/* <div>Rule Condition</div>
    <div style={{border:'1px solid', padding:'20px'}}> */}
    <div title="Rule Group" bordered={true}>
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
        {/* {ruleGroupHtml} */}
        {
          arrData.map((condtion, index)=>{
            return ruleGroupGen(condtion, index);            
          })
        }
    </div>    
      {/* </div>     */}
      </>
  );
};


export default Container;
