import { request } from 'umi';
import ip from '../../../ip';
/** 获取当前的用户 GET /api/currentUser */

export async function login(body) {
  return request(`${ip}/register/AdminLogin`, {
    method: 'POST',
    data: body,
  });
}
