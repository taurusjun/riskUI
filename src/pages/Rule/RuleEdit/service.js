// @ts-ignore

/* eslint-disable */
import { request } from 'umi';

/** 获取规则列表 GET /api/rule */
export async function ruleEditPageInfo(params, options) {
  return request('/api/ruleEditPageInfo', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rulequery(params, options) {
  return request('/api/rulequery', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** 获取变量列表 */
export async function variableDict(params, options) {
  return request('/api/variables', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** 获取比较符列表 */
export async function operatorDict(params, options) {
  return request('/api/operators', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

// /** 新建规则 PUT /api/rule */

// export async function updateRule(data, options) {
//   return request('/api/rule', {
//     data,
//     method: 'PUT',
//     ...(options || {}),
//   });
// }
// /** 新建规则 POST /api/rule */

// export async function addRule(data, options) {
//   return request('/api/rule', {
//     data,
//     method: 'POST',
//     ...(options || {}),
//   });
// }
// /** 删除规则 DELETE /api/rule */

// export async function removeRule(data, options) {
//   return request('/api/rule', {
//     data,
//     method: 'DELETE',
//     ...(options || {}),
//   });
// }
