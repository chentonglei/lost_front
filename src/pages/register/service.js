import { request } from 'umi';
import ip from '../../ip';
/** 获取当前的用户 GET /api/currentUser */

export async function getlist(body) {
  return request(`${ip}/register/show`, {
    method: 'POST',
    data: body,
  });
}
export async function initpwd(body) {
  return request(`${ip}/register/password`, {
    method: 'POST',
    data: body,
  });
}
export async function initCertification(body) {
  //初始化认证
  return request(`${ip}/register/certification`, {
    method: 'POST',
    data: body,
  });
}
export async function setting(body) {
  return request(`${ip}/register/update`, {
    method: 'POST',
    data: body,
  });
}
export async function doit(body) {
  return request(`${ip}/register/doit`, {
    method: 'POST',
    data: body,
  });
}
export async function del(body) {
  return request(`${ip}/register/delete`, {
    method: 'POST',
    data: body,
  });
}
export async function doits(body) {
  return request(`${ip}/register/doits`, {
    method: 'POST',
    data: body,
  });
}
