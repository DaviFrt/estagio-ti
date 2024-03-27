'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Plus } from 'lucide-react'
import { ProductsInMemory } from '@/app/productsDb'
import { useToast } from '@/components/ui/use-toast'

export default function NewProduct() {
  const [name, setName] = useState<string>('')
  const [unitPrice, setUnitPrice] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')

  const { toast } = useToast()

  function handleRegisterNewProduct(event: FormEvent) {
    event.preventDefault()

    const correctedUnitPrice = unitPrice.includes(',')
      ? unitPrice.replace(',', '.')
      : unitPrice
    const convertedUnitPrice = Number(correctedUnitPrice)
    const convertedQuantity = Number(quantity)

    ProductsInMemory.push({
      name,
      unitPrice: convertedUnitPrice,
      quantity: convertedQuantity,
    })

    setName('')
    setUnitPrice('')
    setQuantity('')
    toast({ description: 'Produto criado com sucesso!' })
  }

  return (
    <main className="max-w-4xl mx-auto my-6 px-6">
      <header className="mb-8 flex items-center gap-4">
        <Link href="/">
          <ChevronLeft />
        </Link>
        <h1 className="text-3xl">Cadastro de Produtos</h1>
      </header>
      <form onSubmit={handleRegisterNewProduct} className="flex flex-col gap-4">
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nome do produto"
          required
        />

        <div>
          <Input
            value={unitPrice}
            onChange={(event) => setUnitPrice(event.target.value)}
            placeholder="Preço unitário"
            required
          />
          <span className="text-sm text-zinc-600">
            Use ponto final ( . ) no lugar da vírgula ( , )
          </span>
        </div>

        <Input
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="Quantidade"
          type="number"
          required
        />

        <Button className="gap-3" size="lg">
          <Plus size={18} />
          Adicionar Produto
        </Button>
      </form>
    </main>
  )
}
