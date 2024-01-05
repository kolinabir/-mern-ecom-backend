/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { ZodError, ZodIssue } from 'zod'
import config from '../config'
import { TErrorSources } from '../interface/error'
import handleZodError from '../interface/handleZodErrors'
import handleValidationsError from '../interface/handleValidationError'
import handleCastError from '../interface/handleCastError'
import handleDuplicateError from '../interface/handleDuplicateError'
import AppError from '../error/AppError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = err.statusCode || 500
  let errorMessage = 'Internal Server Error'
  let message = 'Error'
  let errorDetails: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
      kind: 'Error',
      value: 'Something went wrong',
      name: 'Error',
      reason: 'Something went wrong',
      stringValue: 'Something went wrong',
    },
  ]

  if (err instanceof ZodError) {
    //handle zod error
    message = 'Zod Error'
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    errorMessage = simplifiedError?.message
    errorDetails = simplifiedError?.errorSources
  } else if (err?.name === 'ValidationError') {
    //handle mongoose validation error
    message = 'Validation Error'
    const simplifiedError = handleValidationsError(err)
    statusCode = simplifiedError?.statusCode
    errorMessage = simplifiedError?.message
    errorDetails = simplifiedError?.errorSources
  } else if (err?.name === 'CastError') {
    //handle mongoose cast error
    message = 'Cast Error'
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    errorMessage = simplifiedError?.message
    errorDetails = simplifiedError?.errorSources
  } else if (err?.code === 11000) {
    //handle mongoose duplicate error
    message = 'Duplicate Entry'
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    errorMessage = simplifiedError?.message
    errorDetails = simplifiedError?.errorSources
  } else if (err instanceof AppError) {
    //handle app error

    statusCode = err?.statusCode
    errorMessage = err?.message
    if (errorMessage == 'You are not authorized to access this route') {
      return res.status(statusCode).json({
        success: false,
        message: 'Unauthorized Access ',
        errorMessage:
          'You do not have the necessary permissions to access this resource.',
        errorDetails: null,
        // err,
        stack: null,
      })
    }
    // if (errorMessage == 'Password change failed') {
    //   return res.status(statusCode).json({
    //     success: false,
    //     message: 'Unauthorized Access ',
    //     errorMessage,
    //     errorDetails: null,
    //     // err,
    //     stack: null,
    //   })
    // }
    errorDetails = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    errorMessage = err?.message
    errorDetails = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    // err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}

export default globalErrorHandler
