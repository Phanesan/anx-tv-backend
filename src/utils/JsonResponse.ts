export interface JsonResponse {
    message: string;
    data: any;
}

export function JsonResponse<T>(message: string, data: any) {
    return { message, data };
}