import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import Graphin, { Utils, GraphinTreeData } from '@antv/graphin';
import { Row, Col } from 'antd';

const StrategyGraph = () => {
  const nodes = [
    {
      id: 'start_node_002',
    },
    {
      id: 'common_node_002',
    },
    {
      id: 'result_node_0021',
    },
    {
      id: 'result_node_0022',
    },
  ];

  const edges = [
    {
      source: 'start_node_002',
      target: 'common_node_002',
      style: {
        label: {
          value: 'Any',
        },
      },
    },
    {
      source: 'common_node_002',
      target: 'result_node_0021',
      style: {
        label: {
          value: 'Yes',
        },
        keyshape: {
          lineDash: [4, 4],
        },
      },
    },
    {
      source: 'common_node_002',
      target: 'result_node_0022',
      style: {
        label: {
          value: 'No',
        },
        keyshape: {
          lineDash: [4, 4],
          stroke: 'red',
        },
      },
    },
  ];

  nodes.map((node, index) => {
    node.style = {
      label: {
        value: node.id,
      },
      type: 'graphin-circle',
    };
  });

  const data2 = { nodes, edges };

  console.log(data2);

  return (
    <div>
      <Row gutter={8}>
        <Col span={2}>
          <div>StrategyGraph</div>
        </Col>
        <Col span={22}>
          <Graphin
            fitView={true}
            fitCenter={true}
            data={data2}
            layout={{ type: 'dagre', rankdir: 'LR' }}
            // layout={{ type: 'compactBox' }}
            // layout={{ type: 'concentric' }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default StrategyGraph;
