export function response(
    data: any,
    message: string,
    error: Error | null
) {
    return {
        data,
        message,
        error: error ? error.message : null
    };
};