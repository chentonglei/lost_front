import { request } from 'umi';
import ip from '../../ip';
/** 获取当前的用户 GET /api/currentUser */

export async function pwd(body) {
  return request(`${ip}/register/AdminPwd`, {
    method: 'POST',
    data: body,
  });
}
export async function lisettings(body) {
  return request(`${ip}/register/update`, {
    method: 'POST',
    data: body,
  });
}
export async function add(body) {
  return request(`${ip}/register/AdminAdd`, {
    method: 'POST',
    data: body,
  });
}
export async function update(body) {
  return request(`${ip}/introduction/update`, {
    method: 'POST',
    data: body,
  });
}
