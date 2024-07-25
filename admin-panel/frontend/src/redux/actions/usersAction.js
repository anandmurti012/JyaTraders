export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_IS_SET_TARGET = 'UPDATE_IS_SET_TARGET';
export const UPDATE_IS_SUBSCRIBE = 'UPDATE_IS_SUBSCRIBE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PROFILE_IMAGE = 'UPDATE_PROFILE_IMAGE';

export const updateUser = (data) => {
    return {
        type: UPDATE_USER,
        payload: data,
    };
};

export const updateIsSetTarget = (data) => {
    return {
        type: UPDATE_IS_SET_TARGET,
        payload: data,
    };
};

export const updateIsSubscribe = (data) => {
    return {
        type: UPDATE_IS_SUBSCRIBE,
        payload: data,
    };
};


export const updateProfile = (data) => {
    return {
        type: UPDATE_PROFILE,
        payload: data,
    };
};

export const updateProfileImage = (data) => {
    return {
        type: UPDATE_PROFILE_IMAGE,
        payload: data,
    };
};