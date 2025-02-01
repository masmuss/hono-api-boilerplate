export class MessageHelper {
  successCreateMessage(text: string): string {
    return `${text} created successfully`;
  }

  successUpdateMessage(text: string): string {
    return `${text} updated successfully`;
  }

  successDeleteMessage(text: string): string {
    return `${text} deleted successfully`;
  }

  successGetAllMessage(text: string): string {
    return `Get all ${text} successfully`;
  }

  successGetByIdMessage(text: string): string {
    return `Get ${text} by id successfully`;
  }

  errorNotFoundMessage(text: string): string {
    return `${text} not found`;
  }

  errorCreateMessage(text: string): string {
    return `Failed to create ${text}`;
  }

  errorUpdateMessage(text: string): string {
    return `Failed to update ${text}`;
  }

  errorDeleteMessage(text: string): string {
    return `Failed to delete ${text}`;
  }

  errorRequiredMessage(text: string): string {
    return `${text} is required`;
  }

  errorInvalidMessage(text: string): string {
    return `${text} is invalid`;
  }

  errorServerMessage(): string {
    return `Internal server error`;
  }

  errorValidationMessage(): string {
    return `Validation error`;
  }

  errorUnauthorizedMessage(): string {
    return `Unauthorized`;
  }

  errorForbiddenMessage(): string {
    return `Forbidden`;
  }
}
