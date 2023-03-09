import { type AxiosResponse } from 'axios'

enum ResponseStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const getResponse = <T>(response: AxiosResponse): T => {
  if (response.status === ResponseStatus.OK || response.status === ResponseStatus.CREATED || response.status === ResponseStatus.ACCEPTED || response.status === ResponseStatus.NO_CONTENT) {
    return response.data.body
  }

  throw new Error(response.statusText)
}
