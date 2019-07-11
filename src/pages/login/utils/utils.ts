/**
 * @author zhaowenjie
 * @email [zhaowenjie@surongtec.com]
 * @create date 2019-06-18 14:05:33
 * @modify date 2019-06-18 14:05:33
 * @desc [登录信息存储]
 */
import { parse } from 'qs';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority(data: any) {
  //  currentAuthority: 'admin',  默认权限
  console.log('setAuthority', data);
  localStorage.setItem('token', data.token);
  localStorage.setItem('userInfo', JSON.stringify(data));
  data = 'admin';
  const proAuthority = typeof data === 'string' ? [data] : data;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
