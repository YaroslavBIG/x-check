const SET_DEFAULT_PATH = 'SET_DEFAULT_PATH';

export function setDefaultPath(payload: string) {
  return {
    type: SET_DEFAULT_PATH,
    payload
  };
}

const initialState = {
  defaultPath: '/tasks'
};

interface LoginActionType {
  type: typeof SET_DEFAULT_PATH,
  payload: string;
}

export default function loginReducer(state = initialState, action: LoginActionType) {
  switch (action.type) {
    case SET_DEFAULT_PATH:
      return {
        ...state,
        defaultPath: action.payload
      };
    default:
      return state;

  }
}
