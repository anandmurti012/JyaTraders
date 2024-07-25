export const catchError = async (error) => {
    return new Promise((resolve, reject) => {
        if (error.response) {
            resolve(error.response.data.msg || error.message)
        } else if (error.message === "Network Error") {
            resolve(error.message || 'Network Error')
        } else {
            resolve('Something Went Wrong.')
        }
    });
}
