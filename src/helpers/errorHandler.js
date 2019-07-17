const ErrorHandler = {
    successResponse: (res, code, message, data) => {
            return res.status(code).json({
                status: code,
                message: message,
                data: data
            })
        },

    errorResponse: (res, code, message) => {
            return res.status(code).json({
                status: code,
                error: message
            });
        },
};

export default ErrorHandler;