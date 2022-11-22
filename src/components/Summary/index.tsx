import {
  ArrowCircleUp,
  ArrowCircleDown,
  CurrencyCircleDollar,
} from 'phosphor-react'
import { Transaction } from '../../pages/dashboard'
import { priceFormatter } from '../../utils/formatter'
import { useSummary } from './../../hooks/useSummary'
import { SummaryCard, SummaryContainer } from './styles'

interface SummaryProps {
  filteredTransactions: Transaction[]
}

export function Summary({ filteredTransactions }: SummaryProps) {
  const summary = useSummary(filteredTransactions)

  return (
    <SummaryContainer>
      <SummaryCard type="normal">
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={28} color="#00875f" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard type="normal">
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={28} color="#cc0000" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard type={summary.total < 0 ? 'red' : 'green'}>
        <header>
          <span>Total</span>
          <CurrencyCircleDollar size={28} />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
