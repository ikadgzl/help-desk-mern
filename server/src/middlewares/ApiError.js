export default class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static NOT_FOUND(message) {
    return new ApiError(404, message);
  }

  static UNAUTHORIZED(message) {
    return new ApiError(401, message);
  }

  static BAD_REQUEST(message) {
    return new ApiError(400, message);
  }

  static INTERNAL(message) {
    return new ApiError(500, message);
  }
}
