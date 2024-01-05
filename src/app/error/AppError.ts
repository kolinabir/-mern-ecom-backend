class AppError extends Error {
  public statusCode: number

  constructor(statusCode: number, message: string, stack = '') {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
export default AppError

class CustomUnauthorizedError extends Error {
  success: boolean
  errorMessage: string
  errorDetails: null // Add the errorDetails property
  constructor(
    message = 'Unauthorized Access',
    errorMessage: string,
    errorDetails: null,
  ) {
    super(message)
    this.name = 'CustomUnauthorizedError'
    this.success = false
    this.errorMessage =
      errorMessage ||
      'You do not have the necessary permissions to access this resource.'
    this.errorDetails = errorDetails
  }
}
export { CustomUnauthorizedError }
