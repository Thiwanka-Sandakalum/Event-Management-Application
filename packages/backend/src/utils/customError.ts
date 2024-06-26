class CustomError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message?: string, statusCode: number = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export default CustomError;
