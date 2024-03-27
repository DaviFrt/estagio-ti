import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Products } from './components/products'

export default function Home() {
  return (
    <main className="my-6 px-6">
      <div>
        <Button asChild className="gap-3" size="lg">
          <Link href="/products/new">
            <Plus />
            Adicionar Produto
          </Link>
        </Button>

        <div>
          <h1 className="mt-14 mb-6 text-3xl relative left-2">
            Produtos em estoque
            <div className="size-6 bg-zinc-900 rounded-md absolute -bottom-0.5 -left-2 -z-10" />
          </h1>
          <Products />
        </div>
      </div>
    </main>
  )
}
