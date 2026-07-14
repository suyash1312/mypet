function ProductCard({ product }) {
  return (
    <div className="bg-cream rounded-2xl overflow-hidden border border-ink/10 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="aspect-square overflow-hidden bg-greige">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-ink mb-1.5">{product.name}</h3>
        <p className="font-body text-sm text-ink/70 leading-relaxed">{product.description}</p>
      </div>
    </div>
  )
}

export default ProductCard
