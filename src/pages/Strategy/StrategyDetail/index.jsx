import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import Graphin, { Utils, GraphinTreeData } from '@antv/graphin';
import { Card, Row, Col, Spin, Select, Divider } from 'antd';
import { strategyNodeDetail } from '../service';
import { useParams, useRequest } from 'umi';
import { convertEdges2Graph } from '../components/GraphUtils';

const StrategyGraph = () => {
  const params = useParams();
  const ruleUUID = params.uuid;

  const {
    error,
    loading,
    run,
    data: data,
  } = useRequest(() => strategyNodeDetail({ uuid: ruleUUID }));

  //Strategy node edges
  const strategyNodesEdges = loading ? {} : data.strategyNodeGraphVO.connectVOMap;
  //Strategy node detail Map, key is strategy node code
  // const strategyNodeMap = loading ? {} : new Map(Object.entries(data.strategyNodeMap));

  let graphData = {};

  if (!loading) {
    graphData = convertEdges2Graph(strategyNodesEdges);
  }

  console.log(graphData);

  return (
    <Spin spinning={loading} size="large" delay={300}>
      {!loading && (
        <>
          <div style={{ marginBottom: 20 }}>
            <Card title={<div>Strategy Base Info </div>} bordered={false}>
              <Row gutter={10}>
                <Col>
                  <div style={{ paddingLeft: 25, paddingRight: 12 }}>
                    <label style={{ display: 'inline-block', fontSize: 16, fontWeight: 500 }}>
                      Code
                    </label>
                    <div style={{ display: 'inline-block', padding: 10, fontSize: 16 }}>
                      <input
                        name="strategyCode"
                        key="strategyCode"
                        defaultValue={data.code}
                        // onChange={onCodeChange}
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
                        name="strategyName"
                        key="strategyName"
                        // defaultValue={ruleLogic.name}
                        // onChange={onNameChange}
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
                        name="strategyDescription"
                        key="strategyDescription"
                        style={{ width: 400 }}
                        defaultValue={data.description}
                        // onChange={onDescriptionChange}
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
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
          {/* <Divider /> */}
          <div>
            <Card title={<div>StrategyGraph </div>} bordered={false}>
              <Row gutter={8}>
                <Col span={22}>
                  <Graphin
                    fitView={true}
                    fitCenter={true}
                    data={graphData}
                    layout={{ type: 'dagre', rankdir: 'LR' }}
                    // layout={{ type: 'compactBox' }}
                    // layout={{ type: 'concentric' }}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        </>
      )}
    </Spin>
  );
};

export default StrategyGraph;
