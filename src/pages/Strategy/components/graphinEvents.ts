import Graphin, { IG6GraphEvent, Utils, GraphinData } from '@antv/graphin';
import { INode, NodeConfig } from '@antv/g6';
import { message } from 'antd';

Graphin.registerBehavior('sampleBehavior', {
  getEvents() {
    return {
      // 'node:click': 'onClick',
      'node:contextmenu': 'onClick',
    };
  },
  onClick(evt: IG6GraphEvent) {
    evt.preventDefault();
    const node = evt.item as INode;
    const model = node.getModel() as NodeConfig;
    message.info(model.id);
    // TODO
  },
});
