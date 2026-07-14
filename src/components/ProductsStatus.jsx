function ProductsStatus({ loading, error }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div
          className="w-8 h-8 rounded-full border-2 border-ink/15 border-t-clay animate-spin"
          role="status"
          aria-label="Loading products"
        />
        <p className="font-body text-sm text-ink/60">Fetching products…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2 text-center">
        <p className="font-display text-lg text-ink">Something went wrong</p>
        <p className="font-body text-sm text-ink/60 max-w-sm">{error}</p>
      </div>
    )
  }

  return null
}

export default ProductsStatus
