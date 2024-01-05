import { TErrorSources, TGenericErrorResponse } from '../interface/error'

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const regex = /name: "(.*?)"/
  const match = err.message.match(regex)
  const extractedMessage = match && match[1]

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
      keyValue: err.keyValue,
      code: err.code,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  }
}

export default handleDuplicateError
