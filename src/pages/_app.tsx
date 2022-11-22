import type { AppProps } from 'next/app'
import { LoginProvider } from '../contexts/LoginContext'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'
import { Header } from './../components/Header'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoginProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </LoginProvider>
  )
}
