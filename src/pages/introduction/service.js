import { request } from 'umi';
import ip from '../../ip';
/** 获取当前的用户 GET /api/currentUser */

export async function getlist(body) {
  return request(`${ip}/introduction/show`, {
    method: 'POST',
    data: body,
  });
}
