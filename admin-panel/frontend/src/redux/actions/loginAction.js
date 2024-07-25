export const SET_LOGIN_DATA = 'SET_LOGIN_DATA';
export const Logout = 'Logout';

export const setLoginData = (data) => {
  return {
    type: SET_LOGIN_DATA,
    payload: data,
  };
};


export const logout = () => ({
  type: Logout
})