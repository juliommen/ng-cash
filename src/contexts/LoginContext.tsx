import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, ReactNode } from 'react'

interface LoginContextType {
  logoutUser: () => Promise<void>
}

export const LoginContext = createContext({} as LoginContextType)

interface LoginProviderProps {
  children: ReactNode
}

export function LoginProvider({ children }: LoginProviderProps) {
  const router = useRouter()

  async function logoutUser() {
    try {
      await axios.post('/api/logout')
    } catch (e) {
      alert('Falha ao fazer o logout')
    }
    router.push('/login')
  }

  return (
    <LoginContext.Provider value={{ logoutUser }}>
      {children}
    </LoginContext.Provider>
  )
}
