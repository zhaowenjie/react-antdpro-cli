import { query as queryUsers, queryCurrent } from '@/services/user';

const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo');
  try {
    return JSON.parse(userInfo);
  } catch {
    return {};
  }
};

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: getUserInfo(),
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    clearCurrentUserInfo(state) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      return { ...state, currentUser: {} };
    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
