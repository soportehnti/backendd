import HttpException from './http.exception';

class ForbiddenException extends HttpException {
    constructor(message?: string) {
        super(403, message || "Forbbiden");
    }
}

export default ForbiddenException;
