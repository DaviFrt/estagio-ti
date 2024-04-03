export interface ExchangeInNotes {
  value: number
  quantity: number
}

export function calculateChange(total: number, amountPaid: number) {
  let change = Number((amountPaid - total).toFixed(2))
  const moneyBills = [100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05]
  const exchangeInNotes = [] as ExchangeInNotes[]

  moneyBills.forEach((moneyBill) => {
    if (change >= moneyBill) {
      const quantity = Math.floor(change / moneyBill)
      exchangeInNotes.push({ value: moneyBill, quantity })

      change -= quantity * moneyBill
    }
  })

  return exchangeInNotes
}
