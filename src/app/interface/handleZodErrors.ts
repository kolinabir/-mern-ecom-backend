import { ZodError, ZodIssue } from 'zod'
import { TErrorSources, TGenericErrorResponse } from '../interface/error'

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
      pathArray: issue.path.map((p: string | number) => String(p)),
      issueCode: issue.code,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  }
}

export default handleZodError
