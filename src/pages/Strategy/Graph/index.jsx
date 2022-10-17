import Graphin from '@antv/graphin';
import { Col, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { StrategyGraphBehavior } from '../components';
import '../components/graphinEvents';
import '../components/graphinRegisterShape';
import { convertEdges2Graph } from '../components/GraphUtils';
import { strategyNodeGraph } from '../service';

const StrategyGraph = () => {
  const graphinRef = React.createRef();
  const [graphData, setGraphData] = useState(null);
  const [graph, setGraph] = useState(null);

  const { error, loading, run, data: data } = useRequest(() => strategyNodeGraph());

  if (!loading && !graphData) {
    //Strategy node edges
    const strategyNodesEdges = loading ? {} : data.strategyNodeGraph.connectVOMap;
    //Strategy node detail Map, key is strategy node code
    const strategyNodeMap = loading ? {} : new Map(Object.entries(data.strategyNodeMap));
    let gData = convertEdges2Graph(strategyNodesEdges);
    setGraphData(gData);
  }
  ///////   test data -start ////////
  // const loading = false;
  // const nodes = [
  //   {
  //     id: 'start_node_001',
  //   },
  //   {
  //     id: 'common_node_001',
  //   },
  //   {
  //     id: 'common_node_0011',
  //   },
  //   {
  //     id: 'result_node_001',
  //   },
  //   {
  //     id: 'start_node_002',
  //   },
  //   {
  //     id: 'common_node_002',
  //   },
  //   {
  //     id: 'result_node_0021',
  //   },
  //   {
  //     id: 'result_node_0022',
  //   },
  // ];

  // const edges = [
  //   {
  //     source: 'start_node_001',
  //     target: 'common_node_0011',
  //     style: {
  //       label: {
  //         value: 'Any',
  //       },
  //     },
  //   },
  //   {
  //     source: 'common_node_0011',
  //     target: 'result_node_001',
  //     style: {
  //       label: {
  //         value: 'Yes',
  //       },
  //       keyshape: {
  //         lineDash: [4, 4],
  //       },
  //     },
  //   },
  //   {
  //     source: 'common_node_0011',
  //     target: 'start_node_002',
  //     style: {
  //       label: {
  //         value: 'No',
  //       },
  //       keyshape: {
  //         lineDash: [4, 4],
  //         stroke: 'red',
  //       },
  //     },
  //   },
  //   {
  //     source: 'start_node_001',
  //     target: 'common_node_001',
  //     style: {
  //       label: {
  //         value: 'Any',
  //       },
  //     },
  //   },
  //   {
  //     source: 'common_node_001',
  //     target: 'result_node_001',
  //     style: {
  //       label: {
  //         value: 'Yes',
  //       },
  //       keyshape: {
  //         lineDash: [4, 4],
  //       },
  //     },
  //   },
  //   {
  //     source: 'common_node_001',
  //     target: 'start_node_002',
  //     style: {
  //       label: {
  //         value: 'No',
  //       },
  //       keyshape: {
  //         lineDash: [4, 4],
  //         stroke: 'red',
  //       },
  //     },
  //   },
  //   {
  //     source: 'start_node_002',
  //     target: 'common_node_002',
  //     style: {
  //       label: {
  //         value: 'Any',
  //       },
  //     },
  //   },
  //   {
  //     source: 'common_node_002',
  //     target: 'result_node_0021',
  //     style: {
  //       label: {
  //         value: 'Yes',
  //       },
  //       keyshape: {
  //         lineDash: [4, 4],
  //       },
  //     },
  //   },
  //   {
  //     source: 'common_node_002',
  //     target: 'result_node_0022',
  //     style: {
  //       label: {
  //         value: 'No',
  //       },
  //       keyshape: {
  //         lineDash: [4, 4],
  //         stroke: 'red',
  //       },
  //     },
  //   },
  // ];

  // // nodes.forEach((node) => {
  // //   node.type = 'myshape';
  // //   node.label = node.id;
  // //   node.style = {
  // //     stroke: '#72CC4A',
  // //     width: 150,
  // //   };
  // // });

  // nodes.map((node, index) => {
  //   node.style = {
  //     keyshape: {
  //       stroke: 'red',
  //       // fill: 'red',
  //     },
  //     label: {
  //       value: node.id,
  //       fill: 'blue',
  //     },
  //     type: 'graphin-circle',
  //   };
  // });

  // // edges.map((edge, index) => {
  // //   var egdeStyle = edge.style;
  // // });

  // const graphData = { nodes, edges };
  console.log(graphData);
  /////////   test data -end ////////

  useEffect(() => {
    if (!loading && graphinRef.current) {
      const {
        graph, // g6 的Graph实例
        apis, // Graphin 提供的API接口
      } = graphinRef.current;
      setGraph(graph);
      console.log('ref', graphinRef, graph, apis);
    }
  }, [loading]);

  const onNodeHandle = (actionEvent, node) => {
    console.log('click ', actionEvent);
    console.log('node ', node);
    let actionKey = actionEvent.key;
    console.log(actionKey);
    if (actionKey == 'addNode') {
      let newNodeTmp = {
        id: 'test_node_001',
        style: {
          label: {
            value: 'test_node_001',
          },
          type: 'graphin-circle',
        },
      };
      let newGData = { ...graphData };
      newGData.nodes.push(newNodeTmp);

      let newEdge = {
        source: 'start_node_001',
        target: 'test_node_001',
        style: {
          label: {
            value: 'Any',
          },
        },
      };
      newGData.edges.push(newEdge);

      // setGraphData(newGData);
      graph.changeData(newGData);
      graph.layout(newGData);
      graph.paint();
      console.log(graphData);
    }
  };

  return (
    <Spin spinning={loading} size="large" delay={300}>
      {!loading && (
        <>
          <div>
            <Row gutter={8}>
              <Col span={2}>
                <div>StrategyGraph</div>
              </Col>
            </Row>
            <Row>
              <div style={{ width: '100%' }}>
                <Graphin
                  fitView={true}
                  fitViewPadding={[10, 10]}
                  fitCenter={true}
                  data={graphData}
                  ref={graphinRef}
                  layout={{
                    type: 'dagre',
                    rankdir: 'LR',
                    // begin: [200, -150],
                    //align: 'UL',
                  }}
                  // layout={{ type: 'compactBox' }}
                  // layout={{ type: 'concentric' }}
                  // modes={{ default: ['sampleBehavior', 'drag-node', 'click-select'] }}
                >
                  <StrategyGraphBehavior callbackFun={onNodeHandle} />
                </Graphin>
              </div>
            </Row>
          </div>
        </>
      )}
    </Spin>
  );
};

export default StrategyGraph;
