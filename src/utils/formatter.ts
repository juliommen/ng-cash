export const priceFormatter = new Intl.NumberFormat('pt-Br', {
  style: 'currency',
  currency: 'BRL',
})

export const dateFormatter = (isoStringDate: string) => {
  const date = isoStringDate.split('-')
  return date[2] + '/' + date[1] + '/' + date[0]
}
