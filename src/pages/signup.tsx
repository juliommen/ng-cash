import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { LockSimple, EnvelopeSimple, Eye, EyeSlash } from 'phosphor-react'
import { useState, useEffect } from 'react'
import welcomeImg from '../assets/welcome.svg'
import { StyledButton } from '../components/StyledButton'
import { SignupContainer, SignupForm } from '../styles/pages/signup'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { StyledInput } from '../components/StyledInputs/styles'

const signupFormSchema = z.object({
  user: z
    .string()
    .min(3, { message: 'Seu nome de usuário deve ter pelo menos três letras' }),
  password: z
    .string()
    .regex(/^(?:(?=.*\d)(?=.*[A-Z]).*)$/, {
      message: 'Sua senha deve ter ao menos uma letra maiúscula e um número',
    })
    .min(8, { message: 'Sua senha deve ter pelo menos oito caracteres' }),
})

type signupFormTypes = z.infer<typeof signupFormSchema>

export default function Signup() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, submitCount, isSubmitting },
    setFocus,
  } = useForm<signupFormTypes>({
    resolver: zodResolver(signupFormSchema),
  })

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

  const isUserFieldInvalid = errors.user && submitCount > 0
  const isPasswordFieldInvalid = errors.password && submitCount > 0
  const [isUserAlreadyUsed, setIsUserAlreadyUsed] = useState<[boolean, string]>(
    [false, ''],
  )

  const userChanged = watch('user')

  useEffect(() => {
    setIsUserAlreadyUsed([false, ''])
  }, [userChanged])

  const router = useRouter()

  async function handleSignup(data: signupFormTypes) {
    try {
      await axios.post('/api/signup', { data })
      router.push('/dashboard')
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data === 'Username already used.') {
          setIsUserAlreadyUsed([true, 'Esse usuário já está sendo utilizado'])
          return
        } else {
          alert(
            'Nossos servidores estão em manutenção temporária. Tente novamente em alguns minutos.',
          )
        }
      }
    }
    reset()
  }

  return (
    <>
      <Head>
        <title>Cadastro | NG.CASH</title>
      </Head>
      <SignupContainer>
        <Image src={welcomeImg} alt="" />
        <SignupForm action="" onSubmit={handleSubmit(handleSignup)}>
          <h1>Informe seus dados</h1>

          <StyledInput validity={isUserFieldInvalid || isUserAlreadyUsed[0]}>
            <EnvelopeSimple size={20} />
            <input
              autoComplete="off"
              placeholder="Usuário"
              {...register('user')}
            ></input>
          </StyledInput>

          {isUserFieldInvalid && <p>{errors.user!.message}</p>}
          {isUserAlreadyUsed[0] && <p>{isUserAlreadyUsed[1]}</p>}

          <StyledInput validity={isPasswordFieldInvalid}>
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

          {isPasswordFieldInvalid && <p>{errors.password!.message}</p>}

          <StyledButton
            className="buttonDiv"
            buttonText="cadastrar"
            disabled={isSubmitting}
            type="submit"
          />

          <footer>
            <h3>Já tem uma conta?</h3>
            <Link className="a2" href={!isSubmitting ? '/login' : '#'}>
              <span>Entre</span>
            </Link>
          </footer>
        </SignupForm>
      </SignupContainer>
    </>
  )
}
