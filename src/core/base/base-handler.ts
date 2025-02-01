import { MessageHelper } from "@/core/utils/helpers/message.helper"; 

export class BaseHandler {
    protected repository;
    protected messageHelper;
    constructor(repository: any) {
        this.repository = repository;
        this.messageHelper = new MessageHelper();
    }

    responseBuilder(
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
}