import { CircularLayout, DagreLayout, GridLayout } from '@antv/layout';
import { Graph } from '@antv/x6';
import React, { useEffect, useState } from 'react';
// import { data } from './data';

const Test2 = () => {
  const data = {
    // 节点
    nodes: [
      {
        id: 'node3',
        shape: 'circle',
        x: 160,
        y: 40,
        width: 80,
        height: 40,
        label: 'Magic',
        attrs: {
          body: {
            fill: 'blue',
          },
          label: {
            text: 'Hello',
            fill: 'white',
          },
        },
      },
      {
        id: 'node1',
        x: 40,
        y: 40,
        width: 80,
        height: 40,
        label: 'Hello',
      },
      {
        id: 'node2',
        x: 160,
        y: 180,
        width: 80,
        height: 40,
        label: 'World',
      },
    ],
    // 边
    edges: [
      {
        source: 'node1',
        target: 'node2',
      },
      {
        source: 'node1',
        target: 'node3',
      },
    ],
  };

  const [graph, setGraph] = useState(null);
  const [gdata, setGdata] = useState(data);
  const ref = React.useRef(null);

  const gridLayout = new GridLayout({
    type: 'grid',
    width: 600,
    height: 400,
    center: [300, 200],
    rows: 4,
    cols: 4,
    nodeSize: [100, 100],
  });

  const circularLayout = new CircularLayout({
    type: 'circular',
    width: 600,
    height: 400,
    center: [300, 200],
    radius: 50,
  });

  const dagreLayout = new DagreLayout({
    type: 'dagre',
    rankdir: 'LR',
    align: 'UL',
    ranksep: 30,
    nodesep: 15,
    controlPoints: true,
  });

  useEffect(() => {
    const mGraph = new Graph({
      container: ref.current,
      width: 800,
      height: 600,
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
    });

    const gridModel = gridLayout.layout(gdata);
    const circleModel = circularLayout.layout(gdata);
    const dagrenModel = dagreLayout.layout(gdata);
    mGraph.fromJSON(dagrenModel);

    // mGraph.fromJSON(data);
    setGraph(mGraph);
  }, []);

  if (graph) {
    //////////// logic here  //////////
    // graph.fromJSON(data);
    // const gridLayout = new GridLayout({
    //     type: 'grid',
    //     width: 600,
    //     height: 400,
    //     center: [300, 200],
    //     rows: 4,
    //     cols: 4,
    //   });
    //   const newModel = gridLayout.layout(model);
    //   graph.fromJSON(newModel);
    ///////
    // data.edges.push
  }

  const [count, setCount] = useState(0);
  const onClick = (e) => {
    setCount(count + 1);
    console.log(e);
    const newNode = {
      id: 'nodec' + count,
      x: 160,
      y: 40,
      width: 80,
      height: 40,
      label: 'Count' + count,
    };
    const newEdge = {
      source: 'node1',
      target: 'nodec' + count,
    };
    let tData = { ...gdata };
    tData.nodes.push(newNode);
    tData.edges.push(newEdge);
    setGdata(tData);
    const dagrenModel = dagreLayout.layout(gdata);
    graph.fromJSON(dagrenModel);
  };

  return (
    <div>
      <h1>AAAA</h1>
      <button onClick={onClick}>BBBB</button>
      <div id="container" ref={ref} />
    </div>
  );
};

export default Test2;
