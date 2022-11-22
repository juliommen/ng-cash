import { GetServerSideProps } from 'next'
import {
  DashboardContainer,
  DashboardHeader,
  PriceHightLight,
  TransactionsContainer,
  TransactionsTable,
  LoadingContainer,
} from '../styles/pages/dashboard'
import Cookies from 'cookies'
import Head from 'next/head'
import { verifyJwtValidity } from '../lib/jwt'
import { Summary } from '../components/Summary'
import { TransactionFilters } from '../components/TransactionFilters'
import { dateFormatter, priceFormatter } from '../utils/formatter'
import { ArrowCircleLeft, ArrowCircleRight, Wallet } from 'phosphor-react'
import { StyledButton } from '../components/StyledButton'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransaction } from '../components/NewTransaction'
import { useCallback, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { extractUsernameFromToken } from './../lib/jwt'

interface DashboardProps {
  username: string
}

export interface Transaction {
  id: number
  userEnvolved: string
  type: string
  value: number
  createdAt: string
}

export default function Dashboard({ username }: DashboardProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([])
  const [balance, setBalance] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [isTransparent, setIsTransparent] = useState(true)

  const getData = useCallback(async () => {
    const response = await axios.post('/api/get-user-data', { username })
    const { transactions, balance } = response.data
    setTransactions(transactions)
    setFilteredTransactions(transactions)
    setBalance(balance)
    setIsPageLoaded(true)
    setTimeout(() => setIsTransparent(false), 10)
  }, [username])

  useEffect(() => {
    getData()
  }, [getData])

  function onFilterTransactions(
    initialDate: string,
    finalDate: string,
    type: string,
  ) {
    let transactionsAux = transactions
    if (initialDate) {
      transactionsAux = transactionsAux.filter(
        (transaction) => transaction.createdAt >= initialDate,
      )
    }
    if (finalDate) {
      transactionsAux = transactionsAux.filter(
        (transaction) => transaction.createdAt <= finalDate,
      )
    }
    if (type) {
      transactionsAux = transactionsAux.filter(
        (transaction) => transaction.type === type,
      )
    }
    setFilteredTransactions(transactionsAux)
    setPageNumber(1)
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  function onCreateTransaction(
    newTransaction: Transaction,
    newBalance: number,
  ) {
    setTransactions((state) => [...state, newTransaction])
    setFilteredTransactions([...transactions, newTransaction])
    setBalance(newBalance)
  }

  function handleBackPage() {
    if (pageNumber > 1) {
      setPageNumber((state) => state - 1)
    }
    window.getSelection()?.removeAllRanges()
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  function handleForwardPage() {
    if (pageNumber < Math.ceil(filteredTransactions.length / 5)) {
      setPageNumber((state) => state + 1)
    }
    window.getSelection()?.removeAllRanges()
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const totalPages = Math.ceil(filteredTransactions.length / 5)

  const bottomRef = useRef<null | HTMLDivElement>(null)

  return (
    <>
      <Head>
        <title>Dashboard | NG.CASH</title>
      </Head>
      {isPageLoaded ? (
        <DashboardContainer
          className={isTransparent ? 'transparent' : 'colored'}
        >
          <h1>Olá, {username}</h1>
          <div>
            <DashboardHeader>
              <header>
                <span>Saldo da sua carteira</span>
                <Wallet size={32} />
              </header>
              <strong>{priceFormatter.format(balance)}</strong>
            </DashboardHeader>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <StyledButton
                  className="buttonDiv"
                  buttonText="transferir"
                  disabled={balance <= 0}
                  showLoad={false}
                />
              </Dialog.Trigger>
              <NewTransaction
                balance={balance}
                username={username}
                onCreateTransaction={onCreateTransaction}
              />
            </Dialog.Root>
          </div>
          <hr />
          <h2>Transações passadas</h2>
          <Summary filteredTransactions={filteredTransactions} />

          <TransactionsContainer>
            <TransactionFilters
              onFilterTransactions={onFilterTransactions}
              transactions={transactions}
            />
            {filteredTransactions.length > 0 ? (
              <TransactionsTable>
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>Valor transferido</th>
                    <th>Data da transferência</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, i) => {
                    if (
                      i + 1 >= (pageNumber - 1) * 5 + 1 &&
                      i + 1 <= pageNumber * 5
                    ) {
                      return (
                        <tr key={transaction.id}>
                          <td width="35%">{transaction.userEnvolved}</td>
                          <td>
                            <PriceHightLight
                              variant={
                                transaction.type === 'income'
                                  ? 'income'
                                  : 'outcome'
                              }
                            >
                              {priceFormatter.format(transaction.value)}
                            </PriceHightLight>
                          </td>
                          <td>{dateFormatter(transaction.createdAt)}</td>
                        </tr>
                      )
                    }
                    return null
                  })}
                </tbody>
              </TransactionsTable>
            ) : (
              <h3>Não há transações a mostrar</h3>
            )}
          </TransactionsContainer>
          {filteredTransactions.length > 0 && (
            <footer>
              <ArrowCircleLeft
                size={32}
                weight="fill"
                onClick={handleBackPage}
                onDoubleClick={() => {}}
              />
              <h4>
                {pageNumber} / {totalPages}
              </h4>
              <ArrowCircleRight
                size={32}
                weight="fill"
                onClick={handleForwardPage}
                onDoubleClick={() => {}}
              />
            </footer>
          )}
          <div ref={bottomRef} />
        </DashboardContainer>
      ) : (
        <LoadingContainer>
          <ReactLoading
            className="loading"
            type="bars"
            color="#000"
            height={50}
            width={50}
          />
        </LoadingContainer>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res)
  const token = cookies.get('@ng.cash-jwt') ?? ''

  try {
    verifyJwtValidity(token)
  } catch (e) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  const username = extractUsernameFromToken(token)

  return {
    props: { username },
  }
}
