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
            leftId: '1',
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
            leftId: '2',
            operatorCode: 'contains',
            rightValue: 'a',
          },
          {
            _key: '1111-2222-6',
            uuid: '21cfe2de-8e39-4b7c-9219-1d67b18bd7d9',
            logicCode: 'or',
            leftId: '3',
            operatorCode: 'lt',
            rightValue: '99',
          },
        ],
      },
    ],
  };

  return res.json({ data: result });
}

export default {
  'GET /api/rulequery': getRulequery,
};
