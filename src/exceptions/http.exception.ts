enum HttpStatusCode {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    CONFLICT = 409,
}

class HttpException extends Error {
    public status: number;
    public message: string;
    public documentation?: string;

    constructor(status: HttpStatusCode, message: string, documentation?: string) {
        super(message);
        this.status = status;
        this.message = message;
        this.documentation = documentation;
    }
}

export default HttpException;

// https://github.com/mwanago/express-typescript/tree/master/src/exceptions
