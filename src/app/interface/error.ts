export type TErrorSources = {
  path: string | number
  message: string
  kind?: string
  value?: string
  reason?: string
  name?: string
  stringValue?: string
  pathArray?: string[]
  issueCode?: string
  issuesType?: string
  reasonType?: string
  keyValue?: { [key: string]: string }
  code?: number
}[]

export type TGenericErrorResponse = {
  statusCode: number
  message: string
  errorSources: TErrorSources
}
