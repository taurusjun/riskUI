import { GraphinContext } from '@antv/graphin';
import { useContext, useEffect, useState } from 'react';
import { StrategyNodeContextMenu } from '.';

const StrategyGraphBehavior = ({ callbackFun }) => {
  // 节点ContextMenu坐标
  const [showNodeContextMenu, setShowNodeContextMenu] = useState(false);
  const [nodeContextMenuX, setNodeContextMenuX] = useState(0);
  const [nodeContextMenuY, setNodeContextMenuY] = useState(0);
  const [currNode, setCurrNode] = useState(null);

  const { graph, apis } = useContext(GraphinContext);

  const onContextMenuClick = (actionEvent, currNode) => {
    setShowNodeContextMenu(false);
    // let actionKey = e.key;
    callbackFun(actionEvent, currNode);
    ////
    // const newNodeTmp = {
    //   id: 'test_node_001',
    //   style: {
    //     label: {
    //       value: 'test_node_001',
    //     },
    //     type: 'graphin-circle',
    //   },
    // };

    // const color = 'red';
    // const newEdgeTmp = {
    //   // source: currNode.getID(),
    //   target: newNodeTmp.id,
    //   source: 'start_node_001',
    //   // target: 'result_node_001',
    //   style: {
    //     label: {
    //       value: 'Y',
    //       fill: color,
    //     },
    //     keyshape: {
    //       lineDash: [4, 4],
    //       stroke: color,
    //     },
    //   },
    // };

    // graph.addItem('node', newNodeTmp);
    // graph.addItem('edge', newEdgeTmp);
    // graph.render();
  };

  useEffect(() => {
    graph.on('click', (evt) => {
      // setShowNodeTooltip(false);
      setShowNodeContextMenu(false);
    });

    // graph.on('node:click', (evt) => {
    //   // setShowNodeTooltip(false);
    //   setShowNodeContextMenu(false);
    // });

    graph.on('node:dblclick', (evt) => {
      // setShowNodeTooltip(false);
      // setShowNodeContextMenu(false);
      // evt.preventDefault();
      const node = evt.item;
      const model = node.getModel();
      const { x, y } = model;
      const point = graph.getCanvasByPoint(x, y);
      setNodeContextMenuX(point.x);
      setNodeContextMenuY(point.y);
      setShowNodeContextMenu(true);
      setCurrNode(node);
    });

    // graph.on('node:drag', (evt) => {
    //   // setShowNodeTooltip(false);
    //   setShowNodeContextMenu(false);
    // });

    // 节点上面触发mouseleave事件后隐藏tooltip和ContextMenu
    graph.on('node:mouseleave', (evt) => {
      // evt.preventDefault();
      // setShowNodeTooltip(false);
      // setShowNodeContextMenu(false);
    });

    // graph.on('node:contextmenu', (evt) => {
    //   evt.preventDefault();
    //   const node = evt.item;
    //   const model = node.getModel();
    //   const { x, y } = model;
    //   const point = graph.getCanvasByPoint(x, y);
    //   setNodeContextMenuX(point.x);
    //   setNodeContextMenuY(point.y);
    //   setShowNodeContextMenu(true);
    // });
  }, []);
  return (
    <div>
      {showNodeContextMenu && (
        <StrategyNodeContextMenu
          x={nodeContextMenuX}
          y={nodeContextMenuY}
          onClickFunc={(e) => onContextMenuClick(e, currNode)}
        />
      )}
    </div>
  );
};

export default StrategyGraphBehavior;
