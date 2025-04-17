import React, { createContext, useContext, useState, ReactNode } from 'react'
import { IUser } from '@/types/user.types'
import { LocationType } from '@/utils/Location'

interface GlobalContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  user: IUser | null
  setUser: (user: IUser | null) => void
  isLoading: boolean
  setIsLoading: (value: boolean) => void
  location: LocationType | null
  setLocation: (value: LocationType | null) => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState<LocationType | null>(null)
  const value = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    isLoading,
    setIsLoading,
    location,
    setLocation
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }
  return context
}
