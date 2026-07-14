import ProductCard from '../components/ProductCard'
import ProductsStatus from '../components/ProductsStatus'
import { useProducts } from '../contexts/ProductsContext'

function Home() {
  const { products, loading, error } = useProducts()

  return (
    <div className="min-h-screen bg-greige">
      <header className="max-w-6xl mx-auto px-6 sm:px-10 pt-14 pb-10 flex items-center gap-2.5">
        <span className="paw-mark" aria-hidden="true"></span>
        <h1 className="font-display text-3xl sm:text-4xl text-ink tracking-tight">mypet</h1>
      </header>

      <main className="max-w-6xl mx-auto px-6 sm:px-10 pb-20">
        {(loading || error) && <ProductsStatus loading={loading} error={error} />}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
