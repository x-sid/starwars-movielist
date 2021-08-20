// Helper code for the API consumer to understand the error and handle is accordingly
const statusCode = {
  SUCCESS: "10000",
  FAILURE: "10001",
  RETRY: "10002",
  INVALID_ACCESS_TOKEN: "10003",
};

const responseStatus = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class ApiResponse {
  constructor(statusCode, status, message) {
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
  }

  prepare(res, response) {
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  send(res) {
    return this.prepare(res, this);
  }

  static sanitize(response) {
    const clone = {};
    Object.assign(clone, response);
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === "undefined") delete clone[i];
    return clone;
  }
}

class NotFoundResponse extends ApiResponse {
  constructor(message = "Not Found") {
    super(statusCode.FAILURE, responseStatus.NOT_FOUND, message);
  }

  send(res) {
    return super.prepare(res, this);
  }
}

class ForbiddenResponse extends ApiResponse {
  constructor(message = "Forbidden") {
    super(statusCode.FAILURE, responseStatus.FORBIDDEN, message);
  }

  send(res) {
    return super.prepare(res, this);
  }
}

class BadRequestResponse extends ApiResponse {
  constructor(message = "Bad Parameters") {
    super(statusCode.FAILURE, responseStatus.BAD_REQUEST, message);
  }

  send(res) {
    return super.prepare(res, this);
  }
}

class InternalErrorResponse extends ApiResponse {
  constructor(message = "Internal Error") {
    super(statusCode.FAILURE, responseStatus.INTERNAL_ERROR, message);
  }

  send(res) {
    return super.prepare(res, this);
  }
}

class SuccessMsgResponse extends ApiResponse {
  constructor(message) {
    super(statusCode.SUCCESS, responseStatus.SUCCESS, message);
  }

  send(res) {
    return super.prepare(res, this);
  }
}

class FailureMsgResponse extends ApiResponse {
  constructor(message) {
    super(statusCode.FAILURE, responseStatus.SUCCESS, message);
  }

  send(res) {
    return super.prepare(res, this);
  }
}

class SuccessResponse extends ApiResponse {
  constructor(message, data) {
    super(statusCode.SUCCESS, responseStatus.SUCCESS, message, data);
    this.data = data;
  }

  send(res) {
    return super.prepare(res, this);
  }
}

export {
  NotFoundResponse,
  FailureMsgResponse,
  ForbiddenResponse,
  SuccessMsgResponse,
  InternalErrorResponse,
  BadRequestResponse,
  SuccessResponse,
};
