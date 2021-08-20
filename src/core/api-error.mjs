
import {
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
} from "./api-response.mjs";

const environment = process.env.NODE_ENV

const errorType = {
  INTERNAL: "InternalError",
  NOT_FOUND: "NotFoundError",
  NO_ENTRY: "NoEntryError",
  NO_DATA: "NoDataError",
  BAD_REQUEST: "BadRequestError",
  FORBIDDEN: "ForbiddenError",
};

class ApiError extends Error {
  constructor(type, message = "error") {
    super(type);
  }

  static handle(err, res) {
    switch (err.type) {
      case errorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(res);
      case errorType.NOT_FOUND:
      case errorType.NO_ENTRY:
      case errorType.NO_DATA:
        return new NotFoundResponse(err.message).send(res);
      case errorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res);
      default: {
        let message = err.message;
        // Do not send failure message in production as it may send sensitive data
        if (environment === "production") message = "Something wrong happened.";
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}

class InternalError extends ApiError {
  constructor(message = "Internal error") {
    super(errorType.INTERNAL, message);
  }
}

class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(errorType.BAD_REQUEST, message);
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(errorType.NOT_FOUND, message);
  }
}

class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(errorType.NO_ENTRY, message);
  }
}

class NoDataError extends ApiError {
  constructor(message = "No data available") {
    super(errorType.NO_DATA, message);
  }
}

export {
  ApiError,
  InternalError,
  NoDataError,
  NoEntryError,
  NotFoundError,
  BadRequestError,
};
