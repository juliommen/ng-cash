import { useMemo } from 'react'
import { Transaction } from '../pages/dashboard'

export function useSummary(filteredTransactions: Transaction[]) {
  const summary = useMemo(() => {
    return filteredTransactions
      ? filteredTransactions.reduce(
          (total, transaction) => {
            if (transaction.type === 'income') {
              total.income += transaction.value
              total.total += transaction.value
            } else {
              total.outcome += transaction.value
              total.total -= transaction.value
            }
            return total
          },
          {
            income: 0,
            outcome: 0,
            total: 0,
          },
        )
      : {
          income: 0,
          outcome: 0,
          total: 0,
        }
  }, [filteredTransactions])

  return summary
}
