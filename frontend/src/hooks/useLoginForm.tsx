import {useReducer} from 'react';

interface LoginForm {
  username: string;
  password: string;
}

interface LoginFormAction {
  type: ActionType;
  payload: Partial<LoginForm>;
}

type ActionType = 'CHANGE_USERNAME_FIELD' | 'CHANGE_PASSWORD_FIELD';

const INITIAL_FORM_STATE: LoginForm = {
  username: '',
  password: '',
};

function formReducer(state: LoginForm, action: LoginFormAction) {
  switch (action.type) {
    case 'CHANGE_USERNAME_FIELD':
      return {
        ...state,
        username: action.payload.username || '',
      };
    case 'CHANGE_PASSWORD_FIELD':
      return {
        ...state,
        password: action.payload.password || '',
      };
    default:
      return state;
  }
}

export default function useLoginForm() {
  const [form, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);

  function handleUsernameChange(username: string) {
    dispatch({type: 'CHANGE_USERNAME_FIELD', payload: {username}});
  }

  function handlePasswordChange(password: string) {
    dispatch({type: 'CHANGE_PASSWORD_FIELD', payload: {password}});
  }

  return {handleUsernameChange, handlePasswordChange, form};
}