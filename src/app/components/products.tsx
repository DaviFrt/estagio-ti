'use client'

import { Product } from '@/types/Product'
import { useState } from 'react'
import { ProductsInMemory } from '../productsDb'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { formatCurrency } from '../utils/formatCurrency'

export function Products() {
  const [products] = useState<Product[]>(ProductsInMemory)

  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-5 gap-4">
          {products.map((product, index) => (
            <Card className="max-w-72" key={index}>
              <CardHeader>
                <h3>{product.name}</h3>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm">
                  {product.quantity} {product.quantity > 1 ? 'itens' : 'item'}
                </span>
                <span className="text-sm">
                  {formatCurrency(product.unitPrice)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <h2 className="text-lg">
          Ops... parece que estamos sem produtos no estoque!
        </h2>
      )}
    </div>
  )
}
