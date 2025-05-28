export interface Response {
    statusCode: number;
    message: string;
    data: any;
}

export class JsonResponse {
    public static response(statusCode: number, message: string, data: any): Response {
        return {
            statusCode,
            message,
            data,
        };
    }
}