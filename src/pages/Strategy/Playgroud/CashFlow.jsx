import G6 from '@antv/g6';
import React, { useEffect, useState } from 'react';
import './registerShape';

const CashFlow = () => {
  const ref = React.useRef(null);

  const mdata = {
    nodes: [
      {
        id: '1',
        label: 'Company1',
      },
      {
        id: '2',
        label: 'Company2',
      },
      {
        id: '3',
        label: 'Company3',
      },
      {
        id: '4',
        label: 'Company4',
      },
      {
        id: '5',
        label: 'Company5',
      },
      {
        id: '6',
        label: 'Company6',
      },
      {
        id: '7',
        label: 'Company7',
      },
      {
        id: '8',
        label: 'Company8',
      },
      {
        id: '9',
        label: 'Company9',
      },
      // {
      //   id: '10',
      //   label: 'Company10',
      // },
    ],
    edges: [
      {
        source: '1',
        target: '2',
        data: {
          type: 'A',
          amount: '100,000 Yuan',
          date: '2019-08-03',
        },
      },
      {
        source: '1',
        target: '3',
        data: {
          type: 'B',
          amount: '100,000 Yuan',
          date: '2019-08-03',
        },
      },
      {
        source: '2',
        target: '5',
        data: {
          type: 'C',
          amount: '100,000 Yuan',
          date: '2019-08-03',
        },
      },
      // {
      //   source: '2',
      //   target: '10',
      //   data: {
      //     type: 'C',
      //     amount: '900,000 Yuan',
      //     date: '2019-08-03',
      //   },
      // },
      {
        source: '5',
        target: '6',
        data: {
          type: 'B',
          amount: '100,000 Yuan',
          date: '2019-08-03',
        },
      },
      {
        source: '3',
        target: '4',
        data: {
          type: 'C',
          amount: '100,000 Yuan',
          date: '2019-08-03',
        },
      },
      {
        source: '4',
        target: '7',
        data: {
          type: 'B',
          amount: '100,000 Yuan',
          date: '2019-08-03',
        },
      },
      {
        source: '1',
        target: '8',
        data: {
          type: 'B',
          amount: '100,000 Yuan',
          date: '2019-08-03',
        },
      },
      {
        source: '1',
        target: '9',
        data: {
          type: 'C',
          amount: '100,000 Yuan',
          date: '2019-08-03',
        },
      },
    ],
  };

  const [data, setData] = useState(mdata);
  const [graph, setGraph] = useState(null);
  const [count, setCount] = useState(0);

  const rePaint = () => {
    if (graph) {
      graph.data(data);
      graph.render();
      const edges = graph.getEdges();
      edges.forEach(function (edge) {
        const line = edge.getKeyShape();
        const stroke = line.attr('stroke');
        const targetNode = edge.getTarget();
        targetNode.update({
          style: {
            stroke,
          },
        });
      });
      graph.paint();
    }
  };

  const bindEvents = () => {
    if (graph) {
      graph.off('node:dblclick');
      graph.on('node:dblclick', (evt) => {
        // setShowNodeTooltip(false);
        // setShowNodeContextMenu(false);
        evt.preventDefault();
        const node = evt.item;
        const model = node.getModel();
        const { x, y } = model;
        const point = graph.getCanvasByPoint(x, y);
        console.log(evt);
        // setNodeContextMenuX(point.x);
        // setNodeContextMenuY(point.y);
        // setShowNodeContextMenu(true);
        // setCurrNode(node);

        const cont = Math.floor(Math.random() * 1000);
        const sid = node.getID();
        const newNodeId = 'c' + cont;
        console.log(newNodeId);
        const newNode = {
          id: newNodeId,
          label: 'Company' + newNodeId,
        };

        const newEdge = {
          source: sid,
          target: newNodeId,
          data: {
            type: 'C',
            amount: '900,000 Yuan',
            date: '2019-08-03',
          },
        };
        data.nodes.push(newNode);
        data.edges.push(newEdge);
        setData(data);
        rePaint();
      });
    }
  };

  useEffect(() => {
    const mGraph = new G6.Graph({
      container: ref.current,
      width: 1200,
      height: 800,
      layout: {
        type: 'dagre',
        rankdir: 'LR',
        nodesep: 30,
        ranksep: 100,
      },
      modes: {
        default: ['drag-canvas'],
      },
      defaultNode: {
        type: 'round-rect',
        labelCfg: {
          style: {
            fill: '#000000A6',
            fontSize: 10,
          },
        },
        style: {
          stroke: '#72CC4A',
          width: 150,
        },
      },
      defaultEdge: {
        type: 'fund-polyline',
      },
    });
    setGraph(mGraph);
  }, []);

  rePaint();
  bindEvents();

  const onClick = (e) => {
    setCount(count + 1);
    console.log(count);
    const newNodeId = 'c' + count;
    const newNode = {
      id: newNodeId,
      label: 'Company' + newNodeId,
    };

    const newEdge = {
      source: '2',
      target: newNodeId,
      data: {
        type: 'C',
        amount: '900,000 Yuan',
        date: '2019-08-03',
      },
    };
    data.nodes.push(newNode);
    data.edges.push(newEdge);
    setData(data);
    rePaint();
  };

  return (
    <div>
      <button onClick={onClick}>AAAA</button>
      <div ref={ref} />
    </div>
  );
};

export default CashFlow;
