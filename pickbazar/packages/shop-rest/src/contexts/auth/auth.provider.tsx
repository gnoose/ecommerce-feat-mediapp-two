import cookies from 'next-cookies';
import React, { useReducer } from 'react';
import { AuthContext } from './auth.context';
import { Cookies } from 'react-cookie';

const isBrowser = typeof window !== 'undefined';
const cookie = new Cookies();
const INITIAL_STATE = {
  isAuthenticated: isBrowser && !!cookie.get('access_token'),
  currentForm: 'signIn',
};

function reducer(state: any, action: any) {

  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        currentForm: 'signIn',
      };
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
      };
    case 'SIGNUP':
      return {
        ...state,
        currentForm: 'signUp',
      };
    case 'FORGOTPASS':
      return {
        ...state,
        currentForm: 'forgotPass',
      };
    default:
      return state;
  }
}

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
