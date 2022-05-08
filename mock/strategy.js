import { parse } from 'url';

function getStrategyGraph(req, res, u) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query;

  const result = {
    strategyNodeGraph: {
      startNode: {
        uuid: 'f049ff84-a3af-11ec-b909-0242ac120002',
        code: 'start_node_001',
        description: '',
        type: 'start',
        strategyUuid: 'd68c07d6-a3af-11ec-b909-0242ac120002',
      },
      connectVOMap: {
        start_node_001: [
          {
            fromNode: {
              uuid: 'f049ff84-a3af-11ec-b909-0242ac120002',
              code: 'start_node_001',
              description: '',
              type: 'start',
              strategyUuid: 'd68c07d6-a3af-11ec-b909-0242ac120002',
            },
            toNode: {
              uuid: '82d63dad-d7d7-4c55-a7c6-211cfc4e67a6',
              code: 'common_node_001',
              description: '',
              type: 'common',
              strategyUuid: 'd68c07d6-a3af-11ec-b909-0242ac120002',
            },
            logic: 'Any',
          },
        ],
        common_node_001: [
          {
            fromNode: {
              uuid: '82d63dad-d7d7-4c55-a7c6-211cfc4e67a6',
              code: 'common_node_001',
              description: '',
              type: 'common',
              strategyUuid: 'd68c07d6-a3af-11ec-b909-0242ac120002',
            },
            toNode: {
              uuid: '176fc355-cb91-4797-9c39-71ce04f1e75d',
              code: 'start_node_003',
              description: '',
              type: 'start',
              strategyUuid: '952cc300-a696-4829-bb7a-3e3c9b4d83eb',
            },
            logic: 'Y',
          },
          {
            fromNode: {
              uuid: '82d63dad-d7d7-4c55-a7c6-211cfc4e67a6',
              code: 'common_node_001',
              description: '',
              type: 'common',
              strategyUuid: 'd68c07d6-a3af-11ec-b909-0242ac120002',
            },
            toNode: {
              uuid: '62f420fb-02e7-47c7-803a-6f4b51f34c01',
              code: 'start_node_002',
              description: '',
              type: 'start',
              strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
            },
            logic: 'N',
          },
        ],
        result_node_001: [],
        start_node_002: [
          {
            fromNode: {
              uuid: '62f420fb-02e7-47c7-803a-6f4b51f34c01',
              code: 'start_node_002',
              description: '',
              type: 'start',
              strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
            },
            toNode: {
              uuid: '8bce9a9a-e6ce-4cd6-8bbc-1057f6f3ffdf',
              code: 'common_node_002',
              description: '',
              type: 'common',
              strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
            },
            logic: 'Any',
          },
        ],
        common_node_002: [
          {
            fromNode: {
              uuid: '8bce9a9a-e6ce-4cd6-8bbc-1057f6f3ffdf',
              code: 'common_node_002',
              description: '',
              type: 'common',
              strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
            },
            toNode: {
              uuid: 'e289d258-4a07-404a-b65e-3ca99ab6513c',
              code: 'result_node_0021',
              description: '',
              type: 'result',
              strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
            },
            logic: 'Y',
          },
          {
            fromNode: {
              uuid: '8bce9a9a-e6ce-4cd6-8bbc-1057f6f3ffdf',
              code: 'common_node_002',
              description: '',
              type: 'common',
              strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
            },
            toNode: {
              uuid: '48768ba8-e1a3-4558-a0b0-a7fc7a7e0923',
              code: 'result_node_0022',
              description: '',
              type: 'result',
              strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
            },
            logic: 'N',
          },
        ],
        result_node_0021: [],
        result_node_0022: [],
        start_node_003: [],
      },
    },
    strategyNodeMap: {
      start_node_001: {
        uuid: 'f049ff84-a3af-11ec-b909-0242ac120002',
        code: 'start_node_001',
        description: '',
        type: 'start',
        strategyUuid: 'd68c07d6-a3af-11ec-b909-0242ac120002',
      },
      common_node_001: {
        uuid: '82d63dad-d7d7-4c55-a7c6-211cfc4e67a6',
        code: 'common_node_001',
        description: '',
        type: 'common',
        strategyUuid: 'd68c07d6-a3af-11ec-b909-0242ac120002',
      },
      result_node_001: {
        uuid: '319bff6b-164c-43dd-a40e-1ecd0e49d43a',
        code: 'result_node_001',
        description: '',
        type: 'result',
        strategyUuid: 'd68c07d6-a3af-11ec-b909-0242ac120002',
      },
      start_node_002: {
        uuid: '62f420fb-02e7-47c7-803a-6f4b51f34c01',
        code: 'start_node_002',
        description: '',
        type: 'start',
        strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
      },
      common_node_002: {
        uuid: '8bce9a9a-e6ce-4cd6-8bbc-1057f6f3ffdf',
        code: 'common_node_002',
        description: '',
        type: 'common',
        strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
      },
      result_node_0021: {
        uuid: 'e289d258-4a07-404a-b65e-3ca99ab6513c',
        code: 'result_node_0021',
        description: '',
        type: 'result',
        strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
      },
      result_node_0022: {
        uuid: '48768ba8-e1a3-4558-a0b0-a7fc7a7e0923',
        code: 'result_node_0022',
        description: '',
        type: 'result',
        strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
      },
      start_node_003: {
        uuid: '176fc355-cb91-4797-9c39-71ce04f1e75d',
        code: 'start_node_003',
        description: '',
        type: 'start',
        strategyUuid: '952cc300-a696-4829-bb7a-3e3c9b4d83eb',
      },
    },
  };

  return res.json({
    data: result,
    total: 10,
    success: true,
    code: 'OK',
    pageSize: 10,
    current: 1,
  });
}

function getStrategyDetail(req, res, u) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query;

  const result = {
    id: 2,
    uuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
    code: 'strategy_002',
    description: '',
    strategyNodeGraphVO: {
      startNode: {
        uuid: '62f420fb-02e7-47c7-803a-6f4b51f34c01',
        code: 'start_node_002',
        description: '',
        type: 'start',
        strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
      },
      connectVOMap: {
        start_node_002: [
          {
            fromNode: {
              uuid: '62f420fb-02e7-47c7-803a-6f4b51f34c01',
              code: 'start_node_002',
              description: '',
              type: 'start',
              strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
            },
            toNode: {
              uuid: '8bce9a9a-e6ce-4cd6-8bbc-1057f6f3ffdf',
              code: 'common_node_002',
              description: '',
              type: 'common',
              strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
            },
            logic: 'Any',
          },
        ],
        common_node_002: [
          {
            fromNode: {
              uuid: '8bce9a9a-e6ce-4cd6-8bbc-1057f6f3ffdf',
              code: 'common_node_002',
              description: '',
              type: 'common',
              strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
            },
            toNode: {
              uuid: 'e289d258-4a07-404a-b65e-3ca99ab6513c',
              code: 'result_node_0021',
              description: '',
              type: 'result',
              strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
            },
            logic: 'Y',
          },
          {
            fromNode: {
              uuid: '8bce9a9a-e6ce-4cd6-8bbc-1057f6f3ffdf',
              code: 'common_node_002',
              description: '',
              type: 'common',
              strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
            },
            toNode: {
              uuid: '48768ba8-e1a3-4558-a0b0-a7fc7a7e0923',
              code: 'result_node_0022',
              description: '',
              type: 'result',
              strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
            },
            logic: 'N',
          },
        ],
        result_node_0021: [],
        result_node_0022: [],
      },
    },
  };

  return res.json({
    data: result,
    total: 10,
    success: true,
    code: 'OK',
    pageSize: 10,
    current: 1,
  });
}

export default {
  'GET /StrategyPage/graph': getStrategyGraph,
  'GET /StrategyPage/strategy': getStrategyDetail,
};
