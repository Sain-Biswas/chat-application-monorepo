

interface TFetchError {
    success: boolean;
    error: {
        message: string;
        detail: string;
        name: string;
    };
    code: string;
    path: string;
}

export class RPCFetchError extends Error {
    public statusCode: string;
    public detail: string;

    constructor(error: TFetchError) {
        super(error.error.message);
        this.name = error.error.name;
        this.detail = error.error.detail
        this.statusCode = error.code


        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RPCFetchError);
        }
    }

    json() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            detail: this.detail,
            name: this.name,
        }
    }
}
