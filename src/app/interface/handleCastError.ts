import mongoose from 'mongoose'
import { TErrorSources, TGenericErrorResponse } from '../interface/error'

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  console.log(err)
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
      kind: err?.kind,
      value: err?.value,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  }
}

export default handleCastError
