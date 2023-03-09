import { type IUser } from './IUser'

export interface IUserResponse {
  totalCount: number
  results: IUser[]
}

export interface IUserPaginatedResponse {
  data: IUser[]
  nextPage: number
  totalPages: number
}
