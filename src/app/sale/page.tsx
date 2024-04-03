'use client'

import { useState } from 'react'
import { Product } from '@/types/Product'
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProductsInMemory } from '../productsDb'
import { Button } from '@/components/ui/button'
import { DollarSign, Minus, Plus } from 'lucide-react'
import { formatCurrency } from '../utils/formatCurrency'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ExchangeInNotes, calculateChange } from '../utils/calculateChange'

interface SelectedProductType {
  product: Product
  purchasedQuantity: number
}

export default function Sale() {
  const [products] = useState<Product[]>(ProductsInMemory)
  const [selectedProducts, setSelectedProducts] = useState<
    SelectedProductType[]
  >([])
  const [amountPaid, setAmountPaid] = useState<number>(0)
  const [moneyChange, setMoneyChange] = useState<ExchangeInNotes[]>([])
  const [isPaymentModalOpened, setIsPaymentModalOpened] =
    useState<boolean>(false)

  const cartTotal = getTotalPrice()

  function getTotalPrice() {
    let total = 0

    selectedProducts.forEach((data) => {
      total += data.product.unitPrice * data.purchasedQuantity
    })

    return total
  }

  function handleAddProductToSelectedProducts(product: Product) {
    const newSelectedProducts = [...selectedProducts]

    const productAlreadySelected = newSelectedProducts.find(
      (data) => data.product.name === product.name,
    )

    if (productAlreadySelected) {
      productAlreadySelected.purchasedQuantity += 1

      setSelectedProducts(newSelectedProducts)
    } else {
      setSelectedProducts((prevState) => [
        ...prevState,
        { product, purchasedQuantity: 1 },
      ])
    }
  }

  function handleDecreaseProductOfSelectedProducts(product: Product) {
    const newSelectedProducts = [...selectedProducts]

    const productAlreadySelected = newSelectedProducts.find(
      (data) => data.product.name === product.name,
    )

    if (productAlreadySelected) {
      if (productAlreadySelected.purchasedQuantity > 0) {
        productAlreadySelected.purchasedQuantity -= 1

        setSelectedProducts(newSelectedProducts)
      }
    }
  }

  function handleCalculateChange() {
    const moneyChange = calculateChange(cartTotal, amountPaid)

    setMoneyChange(moneyChange)
  }

  function handleGetChangeNotesInText({ quantity, value }: ExchangeInNotes) {
    if (quantity > 1 && value > 1) {
      return `${quantity} notas de ${value}`
    } else if (quantity === 1 && value > 1) {
      return `${quantity} nota de ${value}`
    } else if (quantity === 1 && value <= 1) {
      if (value < 1) {
        return `${quantity} moeda de ${String(value).padEnd(4, '0')}`
      }

      return `${quantity} moeda de ${value}`
    } else if (quantity > 1 && value <= 1) {
      if (value < 1) {
        return `${quantity} moedas de ${String(value).padEnd(4, '0')}`
      }

      return `${quantity} moedas de ${value}`
    }
  }

  function handleFinishSale() {
    setAmountPaid(0)
    setMoneyChange([])
    setSelectedProducts([])
    setIsPaymentModalOpened(false)
  }

  return (
    <>
      <main className="h-full mb-8 px-6">
        <h1 className="mt-14 mb-6 text-3xl relative left-2">
          Venda
          <div className="size-6 bg-zinc-900 rounded-md absolute -bottom-0.5 -left-2 -z-10" />
        </h1>
        <div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-inherit">
                <TableHead>Nome do produto</TableHead>
                <TableHead>Quantidade em estoque</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
              {products.map((product, index) => (
                <>
                  <TableRow key={product.name + index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{formatCurrency(product.unitPrice)}</TableCell>
                    <TableCell className="flex items-center justify-center gap-3">
                      <Button
                        onClick={() =>
                          handleDecreaseProductOfSelectedProducts(product)
                        }
                        size="icon"
                      >
                        <Minus size={18} />
                      </Button>

                      <div className="size-10 flex items-center justify-center border rounded-md">
                        {selectedProducts.find(
                          (data) => data.product.name === product.name,
                        )?.purchasedQuantity || 0}
                      </div>

                      <Button
                        onClick={() =>
                          handleAddProductToSelectedProducts(product)
                        }
                        size="icon"
                      >
                        <Plus size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableHeader>
          </Table>
        </div>
      </main>

      <footer className="w-full px-6 py-2 flex items-center justify-between fixed bottom-1 bg-background">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-zinc-400">
            Subtotal: {formatCurrency(cartTotal)} <small>(0% de imposto)</small>
          </span>
          <span>Valor total: {formatCurrency(cartTotal)}</span>
        </div>

        <Dialog
          open={isPaymentModalOpened}
          onOpenChange={() => setIsPaymentModalOpened(!isPaymentModalOpened)}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setMoneyChange([])
                setAmountPaid(0)
                setIsPaymentModalOpened(true)
              }}
              disabled={cartTotal === 0}
              className="gap-3"
            >
              <DollarSign size={18} />
              Seguir para pagamento
            </Button>
          </DialogTrigger>

          <DialogContent>
            {moneyChange.length > 0 ? (
              <>
                <p>Você deve entregar:</p>
                <div>
                  {moneyChange.map((note, index) => (
                    <div key={index}>{handleGetChangeNotesInText(note)}</div>
                  ))}
                </div>

                <Button onClick={() => handleFinishSale()}>
                  Finalizar venda
                </Button>
              </>
            ) : (
              <>
                <h2 className="text-xl">
                  Valor total: {formatCurrency(cartTotal)}
                </h2>

                <div className="my-4">
                  <Label htmlFor="payment">Valor pago:</Label>
                  <Input
                    value={amountPaid}
                    onChange={(event) =>
                      setAmountPaid(Number(event.target.value))
                    }
                    id="payment"
                    type="number"
                  />

                  <Button
                    onClick={() => handleCalculateChange()}
                    className="w-full mt-3"
                  >
                    Calcular troco
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </footer>
    </>
  )
}
