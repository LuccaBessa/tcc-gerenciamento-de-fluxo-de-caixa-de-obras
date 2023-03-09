import { createContext, type ReactElement, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type User } from 'firebase/auth'

import { type IUser } from '../features/Users/services/interfaces'
import { getResponse, http } from '../utils'

interface ProfileContextType {
  profile: IUser | null
  setProfile: (user: User | null) => void
}

const ProfileContext: React.Context<ProfileContextType> = createContext<ProfileContextType>({
  profile: null,
  setProfile: (user: User | null) => {}
})

const ProfileProvider = ({ children }: any): ReactElement => {
  const [profile, handleProfileState] = useState<IUser | null>(null)
  const navigate = useNavigate()

  const setProfile = (user: User | null): void => {
    if (user != null) {
      http
        .get('/user/profile')
        .then(response => {
          handleProfileState(getResponse(response))
          navigate('/')
        })
        .catch(error => {
          console.error(error)
          navigate('/login')
        })
    } else {
      handleProfileState(null)
      navigate('/login')
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>
  )
}

const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext)
  return context
}

export { ProfileProvider, useProfile }
