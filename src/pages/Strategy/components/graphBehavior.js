import Graphin, { IG6GraphEvent, Utils, GraphinData, GraphinContext } from '@antv/graphin';
import { Row, Col, Spin, message } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { NodeContextMenu } from '.';

const StrategyGraphBehavior = () => {
  // 节点ContextMenu坐标
  const [showNodeContextMenu, setShowNodeContextMenu] = useState(false);
  const [nodeContextMenuX, setNodeContextMenuX] = useState(0);
  const [nodeContextMenuY, setNodeContextMenuY] = useState(0);

  const { graph, apis } = useContext(GraphinContext);

  useEffect(() => {
    graph.on('node:click', (evt) => {
      // setShowNodeTooltip(false);
      setShowNodeContextMenu(false);
    });

    // 节点上面触发mouseleave事件后隐藏tooltip和ContextMenu
    graph.on('node:mouseleave', (evt) => {
      evt.preventDefault();
      // setShowNodeTooltip(false);
      setShowNodeContextMenu(false);
    });

    graph.on('node:contextmenu', (evt) => {
      evt.preventDefault();
      const node = evt.item;
      const model = node.getModel();
      const { x, y } = model;
      // message.info(model.id);
      const point = graph.getCanvasByPoint(x, y);
      setNodeContextMenuX(point.x);
      setNodeContextMenuY(point.y);
      setShowNodeContextMenu(true);
    });
  }, []);
  return (
    <div>
      {showNodeContextMenu && <NodeContextMenu x={nodeContextMenuX} y={nodeContextMenuY} />}
    </div>
  );
};

export default StrategyGraphBehavior;
