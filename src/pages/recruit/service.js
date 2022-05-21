import { request } from 'umi';
import ip from '../../ip';
/** 获取当前的用户 GET /api/currentUser */

export async function getlist(body) {
  return request(`${ip}/recruit/show`, {
    method: 'POST',
    data: body,
  });
}
export async function getcommentlist(body) {
  return request(`${ip}/comment/show`, {
    method: 'POST',
    data: body,
  });
}
export async function showreturn(body) {
  return request(`${ip}/return/show`, {
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
  return request(`${ip}/recruit/delete`, {
    method: 'POST',
    data: body,
  });
}
export async function delcomment(body) {
  return request(`${ip}/comment/delete`, {
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
  return request(`${ip}/recruit/doit`, {
    method: 'POST',
    data: body,
  });
}
