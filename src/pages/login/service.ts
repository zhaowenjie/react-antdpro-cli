import request from '@/utils/request';
import { FromDataType } from './index';

export async function login(params: FromDataType) {
  return request('/service/index/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
