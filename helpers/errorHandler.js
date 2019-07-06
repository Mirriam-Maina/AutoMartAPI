export default class  ErrorHandler{
    static successResponse(res, code, message, data){
        return res.status(code).json({
            status: code,
            message: message,
            data: data
        })
    };

    static errorResponse(res, code, message){
        return res.status(code).json({
            status: code,
            error: message
        });
    };
}