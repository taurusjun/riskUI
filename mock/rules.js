// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { parse } from 'url'; // mock tableListDataSource

function getRulequery(req, res, u) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query;

  const result = {
    uuid: '96668402-87fc-11ec-a8a3-0242ac120002',
    name: 'rule001',
    code: 'rule001',
    categoryId: 1,
    description: '测试规则001',
    status: 'online',
    version: 1,
    ruleGroups: [
      {
        uuid: 'd483e432-87fc-11ec-a8a3-0242ac120002',
        logicCode: 'and',
        ruleConditions: [
          {
            _key: '1111-2222-3',
            uuid: '2a0699f4-87fd-11ec-a8a3-0242ac120002',
            logicCode: 'or',
            leftId: 1,
            operatorCode: 'gt',
            rightValue: '0',
          },
        ],
      },
      {
        uuid: 'fa3cab3c-87fc-11ec-a8a3-0242ac120002',
        logicCode: 'and',
        ruleConditions: [
          {
            _key: '1111-2222-5',
            uuid: '029065ba-87ff-11ec-a8a3-0242ac120002',
            logicCode: 'or',
            leftId: 2,
            operatorCode: 'contains',
            rightValue: 'a',
          },
          {
            uuid: '21cfe2de-8e39-4b7c-9219-1d67b18bd7d9',
            logicCode: 'or',
            leftId: 3,
            operatorCode: 'lt',
            rightValue: '99',
          },
        ],
      },
    ],
  };

  return res.json({ data: result });
}

function variableDict(req, res, u) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query;

  const result = [
    {
      id: 1,
      code: 'testVar001',
      name: '测试变量001',
      return_type: 'Number',
      description: '测试变量001测试用',
    },
    {
      id: 2,
      code: 'testVar002',
      name: '测试变量002',
      return_type: 'List_String',
      description: '测试变量002测试用',
    },
    {
      id: 3,
      code: 'testVar003',
      name: '测试变量003',
      return_type: 'Number',
      description: '测试变量003测试用',
    },
  ];

  return res.json({ data: result });
}

function operatorDict(req, res, u) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query;

  const result = [
    {
      id: 1,
      code: 'gt',
      name: '大于',
      compare_type: 'Number',
      description: '数值测试用',
    },
    {
      id: 2,
      code: 'contains',
      name: '包含',
      compare_type: 'String',
      description: '字符串测试用',
    },
    {
      id: 3,
      code: 'lt',
      name: '小于',
      compare_type: 'Number',
      description: '数值测试用',
    },
  ];

  return res.json({ data: result });
}

function getRuleEditInfo(req, res, u) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query;

  const rule = {
    _key: '1111-2222-1',
    uuid: '96668402-87fc-11ec-a8a3-0242ac120002',
    name: 'rule001',
    code: 'rule001',
    categoryId: 1,
    description: '测试规则001',
    status: 'online',
    version: 1,
    ruleGroups: [
      {
        _key: '1111-2222-2',
        uuid: 'd483e432-87fc-11ec-a8a3-0242ac120002',
        logicCode: 'and',
        ruleConditions: [
          {
            _key: '1111-2222-3',
            uuid: '2a0699f4-87fd-11ec-a8a3-0242ac120002',
            logicCode: 'or',
            leftId: 1,
            operatorCode: 'gt',
            rightValue: '0',
          },
        ],
      },
      {
        _key: '1111-2222-4',
        uuid: 'fa3cab3c-87fc-11ec-a8a3-0242ac120002',
        logicCode: 'and',
        ruleConditions: [
          {
            _key: '1111-2222-5',
            uuid: '029065ba-87ff-11ec-a8a3-0242ac120002',
            logicCode: 'or',
            leftId: 2,
            operatorCode: 'contains',
            rightValue: 'a',
          },
          {
            _key: '1111-2222-6',
            uuid: '21cfe2de-8e39-4b7c-9219-1d67b18bd7d9',
            logicCode: 'or',
            leftId: 3,
            operatorCode: 'lt',
            rightValue: '99',
          },
        ],
      },
    ],
  };

  const actions1 = {
    uuid: '66243293-43d3-4af4-a9d9-026abb5af9ae',
    actionCode: 'addTag',
    paramsValue: '["highRisk","ATO"]',
    extraMap: null,
  };

  const ruleActions = [];
  ruleActions[0] = actions1;
  // resultActions[1] = actions2;
  // resultActions[2] = actions2;

  const ruleAction = {
    uuid: '96668402-87fc-11ec-a8a3-0242ac120002',
    ruleIsTrueActions: ruleActions,
    ruleIsFalseActions: [],
  };

  const actionDefs = [];
  actionDefs[0] = { id: 1, code: 'addTag', name: '加入标签', paramsType: 'List' };
  actionDefs[1] = { id: 2, code: 'addPath', name: '添加偏差值', paramsType: 'String' };

  const variablesArray = [
    {
      id: 1,
      code: 'testVar001',
      name: '测试变量001',
      return_type: 'Number',
      description: '测试变量001测试用',
    },
    {
      id: 2,
      code: 'testVar002',
      name: '测试变量002',
      return_type: 'List_String',
      description: '测试变量002测试用',
    },
    {
      id: 3,
      code: 'testVar003',
      name: '测试变量003',
      return_type: 'Number',
      description: '测试变量003测试用',
    },
  ];

  const operatorsArray = [
    {
      id: 1,
      code: 'gt',
      name: '大于',
      compare_type: 'Number',
      description: '数值测试用',
    },
    {
      id: 2,
      code: 'contains',
      name: '包含',
      compare_type: 'String',
      description: '字符串测试用',
    },
    {
      id: 3,
      code: 'lt',
      name: '小于',
      compare_type: 'Number',
      description: '数值测试用',
    },
  ];

  const tagDict = [
    { id: 1, code: 'highRisk', description: '高风险' },
    { id: 2, code: 'ATO', description: '账号被盗风险' },
    { id: 3, code: 'safeEnv', description: '安全环境' },
  ];

  const result = {
    ruleLogic: rule,
    ruleAction: ruleAction,
    actionDefs: actionDefs,
    tagDict: tagDict,
    variablesArray: variablesArray,
    operatorsArray: operatorsArray,
  };
  return res.json({ data: result });
}

function getAllRules(req, res, u) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query;

  const rule1 = {
    uuid: '96668402-87fc-11ec-a8a3-0242ac120002',
    name: 'rule001',
    code: 'rule001',
    categoryId: 1,
    description: '测试规则001',
    status: 'online',
    version: 1,
  };

  const rule2 = {
    uuid: '11111111-2222-333-4444-5555555',
    name: 'rule002',
    code: 'rule002',
    categoryId: 1,
    description: '测试规则002',
    status: 'online',
    version: 1,
  };

  const result = [];
  result[0] = rule1;
  result[1] = rule2;

  return res.json({
    data: result,
    total: 10,
    success: true,
    pageSize: 10,
    current: 1,
  });
}

function getRuleWithActions(req, res, u) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query;

  const actions1 = {
    uuid: '66243293-43d3-4af4-a9d9-026abb5af9ae',
    actionCode: 'addTag',
    paramsValue: '[\\"highRisk\\",\\"ATO\\"]',
    extraMap: null,
  };

  // const actions2 = {
  //   uuid: '666121-87fc-11ec-a8a3-0242ac120002',
  //   name: 'AddFraudType',
  //   code: 'addFraudType',
  //   description: 'add fraud types to the events',
  //   input: {
  //     type: 'singleSelect',
  //     value: ['ato', 'dto'],
  //   },
  // };

  // const actions3 = {
  //   uuid: '658968496-87fc-11ec-a8a3-0242ac120002',
  //   name: 'AddPath',
  //   code: 'addPath',
  //   description: 'add path to the events',
  //   input: {
  //     type: 'input',
  //     value: '',
  //   },
  // };

  const ruleActions = [];
  ruleActions[0] = actions1;
  // resultActions[1] = actions2;
  // resultActions[2] = actions2;

  const ruleWithActions = {
    uuid: '96668402-87fc-11ec-a8a3-0242ac120002',
    ruleIsTrueActions: ruleActions,
    ruleIsFalseActions: [],
  };

  const actionDefs = [];
  actionDefs[0] = { id: 1, code: 'addTag', name: '加入标签', paramsType: 'List' };

  const result = {
    ruleWithActions: ruleWithActions,
    actionDefs: actionDefs,
  };

  return res.json({
    data: result,
    total: 10,
    success: true,
    pageSize: 10,
    current: 1,
  });
}

export default {
  'GET /RulePage/action': getRuleWithActions,
  'GET /RulePage/rule': getRuleEditInfo,
  'GET /RulePage/list': getAllRules,
  'GET /api/rulequery': getRulequery,
  'GET /api/variables': variableDict,
  'GET /api/operators': operatorDict,
};
