export const UserService = (): any => {
  const getAllUsers = (): string => {
    return 'Users'
  }

  const getUserById = (id: string): string => {
    return 'User'
  }

  return {
    getUserById,
    getAllUsers
  }
}
