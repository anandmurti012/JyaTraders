import { SET_LOGIN_DATA } from "../actions/loginAction";
import { UPDATE_IS_SET_TARGET, UPDATE_IS_SUBSCRIBE, UPDATE_PROFILE, UPDATE_PROFILE_IMAGE, UPDATE_USER } from "../actions/usersAction";

const initialState = {
  token: '',
  type: '',
  isLoggedIn: false,
  subtype: '',
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return {
        token: action.payload.token,
        type: action.payload.type,
        isLoggedIn: action.payload.isLoggedIn,
        subtype: action.payload.subtype,
        user: action.payload.user
      };
    case UPDATE_USER:
      return {
        ...state, // Spread the existing state
        user: action.payload // Update only the user property
      };
    case UPDATE_IS_SET_TARGET:
      return {
        ...state, // Spread the existing state
        user: {
          ...state.user, // Spread the existing user object
          isSetTarget: action.payload // Update only the isSetTarget property
        }
      };
    case UPDATE_IS_SUBSCRIBE:
      return {
        ...state, // Spread the existing state
        user: {
          ...state.user, // Spread the existing user object
          isSubscribe: action.payload // Update only the isSetTarget property
        }
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          fullName: action.payload.firstName + " " + action.payload.middleName + " " + action.payload.lastName,
          firstName: action.payload.firstName,
          middleName: action.payload.middleName,
          lastName: action.payload.lastName,
          dob: action.payload.dob,
          gender: action.payload.gender,
          aadharId: action.payload.aadharId
        }
      };
    case UPDATE_PROFILE_IMAGE:
      return {
        ...state,
        user: {
          ...state.user,
          image: action.payload
        }
      };
    default:
      return state;
  }
};

export default userReducer;