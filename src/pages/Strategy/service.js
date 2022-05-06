// @ts-ignore

/* eslint-disable */
import { request } from 'umi';

/** 获取策略全图列表 GET /StrategyPage/graph */
export async function strategyNodeGraph(params, options) {
  return request('/StrategyPage/graph', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
