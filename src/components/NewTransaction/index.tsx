import { UserCircle, X, CurrencyCircleDollar } from 'phosphor-react'
import { CloseButton, Content, Overlay } from './styles'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import * as Dialog from '@radix-ui/react-dialog'
import { StyledButton } from '../StyledButton'
import { priceFormatter } from '../../utils/formatter'
import { Transaction } from '../../pages/dashboard'
import { StyledInput } from '../StyledInputs/styles'
import { useState, useEffect } from 'react'

const newTransactionFormSchema = z.object({
  usernameDestiny: z.string().min(1),
  value: z.number(),
})

type NewTransactionFormTypes = z.infer<typeof newTransactionFormSchema>

interface NewTransactionProps {
  balance: number
  username: string
  onCreateTransaction: (transaction: Transaction, balance: number) => void
}

export function NewTransaction({
  balance,
  username,
  onCreateTransaction,
}: NewTransactionProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
  } = useForm<NewTransactionFormTypes>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  const [isUserInvalid, setIsUserInvalid] = useState<[boolean, string]>([
    false,
    '',
  ])
  const [isTransactionCreate, setIsTransactionCreated] = useState(true)

  const usernameChanged = watch('usernameDestiny')
  const valueChange = watch('value')

  useEffect(() => {
    setIsUserInvalid([false, ''])
  }, [usernameChanged])

  useEffect(() => {
    setIsUserInvalid([false, ''])
  }, [valueChange])

  async function handleCreateNewTransaction(data: NewTransactionFormTypes) {
    const { usernameDestiny, value } = data
    if (usernameDestiny === username) {
      setIsUserInvalid([
        true,
        'Não é possível realizar uma transferência para você mesmo',
      ])
      return
    }
    try {
      const response = await axios.post('/api/make-transfer', {
        usernameOrigin: username,
        usernameDestiny,
        value,
      })
      onCreateTransaction(
        response.data.createdTransaction,
        response.data.newBalance,
      )
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data === 'User destiny not found.') {
          setIsUserInvalid([true, 'Usuário não encontrado'])
        } else {
          alert(
            'Nossos servidores estão em manutenção temporária. Tente novamente em alguns minutos.',
          )
        }
        return
      }
    }
    reset()
  }

  useEffect(() => {
    setIsTransactionCreated(true)
    setTimeout(() => setIsTransactionCreated(false), 2000)
  }, [balance])

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transferência</Dialog.Title>
        <CloseButton disabled={isSubmitting}>
          <X size={24} />
        </CloseButton>
        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <StyledInput validity={isUserInvalid[0]}>
            <UserCircle size={20} />
            <input
              type="text"
              placeholder="Usuário"
              autoComplete="off"
              {...register('usernameDestiny')}
            />
          </StyledInput>
          {isUserInvalid[0] && <p>{isUserInvalid[1]}</p>}
          <StyledInput>
            <CurrencyCircleDollar size={20} />
            <input
              type="number"
              placeholder="Valor"
              max={balance}
              min={0.01}
              step={0.01}
              autoComplete="off"
              {...register('value', { valueAsNumber: true })}
            />
          </StyledInput>
          <h3 className={isTransactionCreate ? 'newBalance' : ''}>
            Saldo atual: {priceFormatter.format(balance)}
          </h3>
          <StyledButton
            className="buttonDiv"
            buttonText="transferir"
            disabled={isSubmitting}
            type="submit"
          />
        </form>
      </Content>
    </Dialog.Portal>
  )
}
