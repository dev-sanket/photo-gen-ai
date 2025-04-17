import { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useApi } from './useApi'
import { useGlobalContext } from '@/context/GlobalContext'
import { IUser } from '@/types/user.types'
import { ApiResponse } from '@/types/apiResp.types'

export const useDbUser = () => {
  const { isSignedIn } = useAuth()
  const api = useApi()
  const { user: clerkUser } = useUser()

  const { user, setUser, setIsLoading, setIsAuthenticated } = useGlobalContext()

  const fetchUserData = async () => {
    try {
      setIsLoading(true)
      if (isSignedIn) {
        const response = await api.get<ApiResponse<IUser>>(
          api.routes.USER.GET_USER_BY_ID(clerkUser?.id || '')
        )
        setUser(response.data.data as IUser)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [isSignedIn])

  const updateUserData = async (updatedUser: Partial<IUser>) => {
    try {
      setIsLoading(true)
      const response = await api.put<IUser>(
        api.routes.USER.GET_USER_BY_ID('me'),
        updatedUser
      )
      console.log('response ---->', response.data)
      setUser(response.data)
    } catch (error) {
      console.error('Error updating user data:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isLoading: useGlobalContext().isLoading,
    fetchUserData
    // updateUserData
  }
}
