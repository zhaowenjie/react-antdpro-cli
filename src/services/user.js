import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function logout(params) {
  return request('/service/user/logout', {
    method: 'POST',
    data: params,
  });
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
