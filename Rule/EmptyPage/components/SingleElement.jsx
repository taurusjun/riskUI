import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button } from 'antd';
import { useState, useEffect } from 'react';

const SingleElement = ({data, onDelete}) => {

  //////  delete button //////
  const onRuleDelete = (e) =>{
    // setRuleCond(null);
    onDelete(e);
    // triggerChange({}, "delete");    
  };
   
  return (
    <>
        <Col span={6}>
            <Input
             placeholder='value' 
             defaultValue={data}
            />
        </Col>
        <Col span={2}>
          <Row gutter={16}>
            <Col>
            { 
              <Button
                  type="primary"
                  shape="circle"
                  icon={<MinusOutlined />}
                  onClick={onRuleDelete}
                />
            }
            </Col>
          </Row>
        </Col>
      </>
  );

};


export default SingleElement;
