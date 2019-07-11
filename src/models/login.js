import { routerRedux } from 'dva/router';
import { stringify, parse } from 'qs';
import { logout } from '@/services/user';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *logout({ payload }, { call, put }) {
      const response = yield call(logout, payload);
      console.log(response);
      yield put({
        type: 'user/clearCurrentUserInfo',
        payload: response.data,
      });
      const { redirect } = getPageQuery(); // redirect
      if (window.location.pathname !== '/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
