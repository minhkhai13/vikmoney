class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = '', body = null) {
      super(message)
      this.statusCode = statusCode
      this.isOperational = isOperational
      this.body = body
      this.name = 'ApiError'
      if (stack) {
        this.stack = stack
      } else {
        Error.captureStackTrace(this, this.constructor)
      }
    }
  }
  module.exports = ApiError
  