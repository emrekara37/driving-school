const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  GET_COURSE_ID: 'GET_COURSE_ID',
  INIT: 'INIT',
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: (data) => ({
    type: actions.LOGIN_REQUEST,
    payload: {data} ,
  }),
  logout: () => ({
    type: actions.LOGOUT,
  }),
  init:()=>({
    type:actions.INIT
  })
};
export default actions;
