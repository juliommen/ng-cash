import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { LockSimple, EnvelopeSimple, Eye, EyeSlash } from 'phosphor-react'
import { useEffect, useState } from 'react'
import welcomeImg from '../assets/welcome.svg'
import { StyledButton } from '../components/StyledButton'
import { LoginContainer, LoginForm } from '../styles/pages/login'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { StyledInput } from '../components/StyledInputs/styles'

const loginFormSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

type loginFormTypes = z.infer<typeof loginFormSchema>

export default function Login() {
  const { register, handleSubmit, reset, formState, watch, setFocus } =
    useForm<loginFormTypes>({
      resolver: zodResolver(loginFormSchema),
    })

  const [isUserFound, setIsUserFound] = useState<[boolean, string]>([false, ''])
  const [isPwCorrect, setIsPwCorrect] = useState<[boolean, string]>([false, ''])
  const router = useRouter()

  const userChanged = watch('username')
  const pwdChanged = watch('password')

  useEffect(() => {
    setIsUserFound([false, ''])
  }, [userChanged])

  useEffect(() => {
    setIsPwCorrect([false, ''])
  }, [pwdChanged])

  async function handleLogin(data: loginFormTypes) {
    try {
      await axios.post('/api/login', { data })
      router.push('/dashboard')
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data === 'User not found.') {
          setIsUserFound([true, 'Usuário não encontrado'])
          setIsPwCorrect([false, ''])
        } else if (e.response?.data === 'Incorrect password.') {
          setIsPwCorrect([true, 'Senha incorreta'])
          setIsUserFound([false, ''])
        } else {
          alert(
            'Nossos servidores estão em manutenção temporária. Tente novamente em alguns minutos.',
          )
        }
      }
      return
    }
    reset()
  }

  const [hidePassword, setHidePassword] = useState(true)
  function handleHidePassword() {
    setHidePassword((state) => !state)
    setFocus('password')
  }
  let passwordInputType
  if (hidePassword) {
    passwordInputType = 'password'
  } else {
    passwordInputType = 'text'
  }

  return (
    <>
      <Head>
        <title>Login | NG.CASH</title>
      </Head>
      <LoginContainer>
        <Image src={welcomeImg} alt="" />
        <LoginForm action="" onSubmit={handleSubmit(handleLogin)}>
          <h1>Bem-vindo de volta</h1>

          <StyledInput validity={isUserFound[0]}>
            <EnvelopeSimple size={20} />
            <input
              autoComplete="off"
              placeholder="Usuário"
              {...register('username')}
            ></input>
          </StyledInput>

          {isUserFound[0] && <p>{isUserFound[1]}</p>}

          <StyledInput validity={isPwCorrect[0]}>
            <LockSimple size={20} weight="fill" />
            <input
              autoComplete="off"
              placeholder="Senha"
              type={passwordInputType}
              {...register('password')}
            ></input>

            {hidePassword ? (
              <Eye
                size={18}
                onClick={handleHidePassword}
                weight="fill"
                tabIndex={-1}
              />
            ) : (
              <EyeSlash
                size={18}
                onClick={handleHidePassword}
                weight="fill"
                tabIndex={-1}
              />
            )}
          </StyledInput>

          {isPwCorrect[0] && <p>{isPwCorrect[1]}</p>}

          <StyledButton
            className="buttonDiv"
            buttonText="entrar"
            disabled={formState.isSubmitting}
            type="submit"
          />

          <footer>
            <h3>Não tem uma conta?</h3>
            <Link
              className="a2"
              href={!formState.isSubmitting ? '/signup' : '#'}
            >
              <span>Cadastre-se</span>
            </Link>
          </footer>
        </LoginForm>
      </LoginContainer>
    </>
  )
}
