import logo from '../../assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { HeaderContainer, LogoutButton } from './styles'
import { SignOut } from 'phosphor-react'
import { useRouter } from 'next/router'
import axios from 'axios'

export function Header() {
  const router = useRouter()
  const isUserLogged = router.pathname === '/dashboard'

  async function handleLogout() {
    try {
      await axios.post('/api/logout')
    } catch (e) {
      alert('Falha ao fazer o logout')
      return
    }
    router.push('/login')
  }

  return (
    <HeaderContainer>
      <Link href={'/'} prefetch={false}>
        <Image src={logo} width={100} height={100} alt="" />
      </Link>
      {isUserLogged && (
        <LogoutButton onClick={handleLogout} title="Logout">
          <SignOut size={32} weight="bold" />
        </LogoutButton>
      )}
    </HeaderContainer>
  )
}
