import { createContext, type ReactElement, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type User } from 'firebase/auth'

interface ProfileContextType {
  profile: User | null
  setProfile: (user: User | null) => void
}

const ProfileContext: React.Context<ProfileContextType> = createContext<ProfileContextType>({
  profile: null,
  setProfile: (user: User | null) => {}
})

const ProfileProvider = ({ children }: any): ReactElement => {
  const [profile, handleProfileState] = useState<User | null>(null)
  const navigate = useNavigate()

  const setProfile = (user: User | null): void => {
    console.log(user)
    handleProfileState(user)
    user != null ? navigate('/') : navigate('/login')
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
