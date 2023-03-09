/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getResponse, http } from '../../../utils'

import { type IUserResponse } from './interfaces/IUserResponse'

export const UserService = () => {
  const getAllUsers = async (pageNumber: number, pageSize: number, queryParam?: string): Promise<IUserResponse> => {
    const response = await http.get(`/user?pageNumber=${pageNumber}&pageSize=${pageSize}${(queryParam != null) ? `&queryParam=${queryParam}` : ''}`)
    return getResponse<IUserResponse>(response)
  }

  const getUserById = (id: string): string => {
    return 'User'
  }

  return {
    getUserById,
    getAllUsers
  }
}
