/* @flow */
import { REHYDRATE } from 'redux-persist/constants';

type UserState = {
  token: ?string,
};

const InitialState: UserState = {
  token: null,
};

const SET_TOKEN = '@user/SET_TOKEN';

export function reducer(
  state: UserState = InitialState,
  action: Object
): UserState {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
        ...action.payload.user,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
  }
  return state;
}

export const actions = {
  setUserToken(token: string) {
    return { type: SET_TOKEN, token };
  },
};

export const selectors = {
  getUserToken: (state: Object) => state.user.token,
};
