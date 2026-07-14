import { Link } from 'react-router-dom'
import ProductsStatus from '../../components/ProductsStatus'
import { useProducts } from '../../contexts/ProductsContext'

function ProductList() {
  const { products, loading, error } = useProducts()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-ink">
          Products {!loading && !error ? `(${products.length})` : ''}
        </h2>
        <Link
          to="/admin/add"
          className="bg-clay text-cream text-sm font-body px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          + Add Product
        </Link>
      </div>

      {(loading || error) && <ProductsStatus loading={loading} error={error} />}

      {!loading && !error && (
        <div className="bg-cream rounded-2xl border border-ink/10 divide-y divide-ink/10 overflow-hidden">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4 p-4 sm:p-5">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-greige shrink-0">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-base text-ink truncate">{product.name}</h3>
                <p className="font-body text-sm text-ink/60 line-clamp-1">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
