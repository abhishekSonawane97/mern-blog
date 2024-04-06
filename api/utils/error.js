export const errorHandler = (statusCode, message) =>{
    const error = new Error()
    error.statusCode = statusCode
    error.message = message
    // console.log('error : ', error)
    return error;
}

// errorHandler(500, 'try error');