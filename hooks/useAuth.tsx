import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react'
import { useAsyncStorage } from './useAsyncStorage'

interface AuthContextType {
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials?: { email: string; password: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { getData, storeData, removeData } = useAsyncStorage()

  useEffect(() => {
    const readToken = async () => {
      try {
        const token = await getData<string>('token')
        if (token) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error reading token:', error)
      } finally {
        setIsLoading(false)
      }
    }
    readToken()
  }, [])

  const login = async (credentials?: { email: string; password: string }) => {
    try {
      const fakeToken = Math.random().toString(36).substring(2, 15)
      await storeData('token', fakeToken)
      await storeData('credentials', JSON.stringify(credentials))
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await removeData('token')
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
