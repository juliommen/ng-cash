import { SyntheticEvent, useState, ChangeEvent, useEffect } from 'react'
import { Transaction } from '../../pages/dashboard'
import { FilterFormContainer } from './styles'

interface FormProps {
  type: { value: 'income' | 'outcome' | '' }
  initialDate: { value: string }
  finalDate: { value: string }
}
interface TransactionFiltersProps {
  onFilterTransactions: (
    initialDate: string,
    finalDate: string,
    type: string,
  ) => void
  transactions: Transaction[]
}
export function TransactionFilters({
  onFilterTransactions,
  transactions,
}: TransactionFiltersProps) {
  const [initialDate, setInitialDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [type, setType] = useState('')

  function handleFilterTransactions(e: SyntheticEvent) {
    e.preventDefault()
    const target = e.target as typeof e.target & FormProps
    const type = target.type.value
    const initialDate = target.initialDate.value
      ? new Date(target.initialDate.value).toISOString().split('T')[0]
      : ''
    const finalDate = target.finalDate.value
      ? new Date(target.finalDate.value).toISOString().split('T')[0]
      : ''

    onFilterTransactions(initialDate, finalDate, type)
  }

  function handleChangeInitialDate(e: ChangeEvent<HTMLInputElement>) {
    setInitialDate(e.target.value)
  }
  function handleChangeFinalDate(e: ChangeEvent<HTMLInputElement>) {
    setFinalDate(e.target.value)
  }
  function handleChangeType(e: ChangeEvent<HTMLSelectElement>) {
    setType(e.target.value)
  }
  function handleCleanFilters() {
    setInitialDate('')
    setFinalDate('')
    setType('')
    onFilterTransactions('', '', '')
  }

  useEffect(() => {
    setInitialDate('')
    setFinalDate('')
    setType('')
  }, [transactions])

  return (
    <FilterFormContainer action="" onSubmit={handleFilterTransactions}>
      <h2>Filtros</h2>
      <div>
        <section>
          <label>Data inicial</label>
          <input
            name="initialDate"
            type="date"
            placeholder="Data inicial"
            onChange={handleChangeInitialDate}
            value={initialDate}
          />
        </section>
        <section>
          <label>Data final</label>
          <input
            name="finalDate"
            type="date"
            placeholder="Data final"
            onChange={handleChangeFinalDate}
            value={finalDate}
          />
        </section>
        <section>
          <label>Tipo de transação</label>
          <select name="type" onChange={handleChangeType} value={type}>
            <option value="">Todas</option>
            <option value="income">Entradas</option>
            <option value="outcome">Saídas</option>
          </select>
        </section>
        <button type="submit">Filtrar</button>
        <button onClick={handleCleanFilters}>Limpar filtros</button>
      </div>
    </FilterFormContainer>
  )
}
