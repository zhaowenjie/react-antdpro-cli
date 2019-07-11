/**
 * @author zhaowenjie
 * @email [zhaowenjie@surongtec.com]
 * @create date 2019-06-18 13:56:07
 * @modify date 2019-06-18 13:56:07
 * @desc [登录逻辑处理]
 */
import { routerRedux } from 'dva/router';
import { Reducer, AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';

import { login, getFakeCaptcha } from './service';
import { getPageQuery, setAuthority } from './utils/utils';

export interface IStateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: IStateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: IStateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<IStateType>;
  };
}

const Model: ModelType = {
  namespace: 'userLogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      console.warn('init login', response);
      // Login successfully
      if (response.code === '00') {
        yield put({
          type: 'changeLoginStatus',
          payload: response.data,
        });
        // 保存用户信息
        yield put({
          type: 'user/saveCurrentUser',
          payload: response.data,
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
