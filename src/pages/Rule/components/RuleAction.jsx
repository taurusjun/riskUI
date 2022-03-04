import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Select, Input, Form, Spin, Card, Col, Popover, Row, message, Button } from 'antd';
import { useState, useEffect } from 'react';
import styles from './index.less';

const RuleAction = ({ actions, onChange }) => {
  const triggerChange = (changedValue) => {
    onChange?.(changedValue);
  };

  // const onLogicChange = (newLogic) => {
  //   setLogicValue(newLogic);
  //   triggerChange(newLogic);
  // };

  // const logicOptions = [];
  // let defaultLogic = {};
  // const logicOptionsMap = new Map();
  // logicOps.forEach((value, key) => {
  //   var opt = { label: value, value: key };
  //   logicOptions.push(opt);
  //   logicOptionsMap.set(key, opt);
  //   if (logicValue && key.toUpperCase() == logicValue.toUpperCase()) {
  //     defaultLogic = { label: value, value: key };
  //   }
  // });

  return (
    <>
      {/* <Select
        className={styles.customSelect}
        style={{ width: 100 }}
        placeholder="Select"
        options={logicOptions}
        defaultValue={defaultLogic}
        onChange={onLogicChange}
      /> */}
    </>
  );
};

export default RuleAction;
