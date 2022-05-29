import { request } from 'umi';
import ip from '../../ip';
/** 获取当前的用户 GET /api/currentUser */

export async function getlist(body) {
  return request(`${ip}/school/show`, {
    method: 'POST',
    data: body,
  });
}
export async function add(body) {
  return request(`${ip}/introduction/add`, {
    method: 'POST',
    data: body,
  });
}
export async function del(body) {
  return request(`${ip}/school/delete`, {
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
export async function doit(body) {
  return request(`${ip}/school/doit`, {
    method: 'POST',
    data: body,
  });
}
