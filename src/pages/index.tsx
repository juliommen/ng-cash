import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import welcomeImg from '../assets/welcome.svg'
import { HomeContainer } from '../styles/pages/home'
import { StyledButton } from '../components/StyledButton'
import { verifyJwtValidity } from '../lib/jwt'
import { GetServerSideProps } from 'next'
import Cookies from 'cookies'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | NG.CASH</title>
      </Head>
      <HomeContainer>
        <Image src={welcomeImg} alt="" />
        <div>
          <Link href={'/signup'}>
            <StyledButton buttonText="criar conta" />
          </Link>
          <Link className="a2" href={'/login'}>
            <span>acessar minha conta</span>
          </Link>
        </div>
      </HomeContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res)
  const token = cookies.get('@ng.cash-jwt') ?? ''

  try {
    verifyJwtValidity(token)
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  } catch (e) {}

  return {
    props: {},
  }
}
