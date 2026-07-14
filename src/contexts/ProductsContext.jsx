import { createContext, useContext, useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('products')
      .select('id, name, description, image_url')
      .order('id', { ascending: true })

    if (fetchError) {
      console.error('Failed to fetch products:', fetchError.message)
      setError('We couldn\u2019t load the products right now. Please try again in a moment.')
      setProducts([])
    } else {
      setProducts(data ?? [])
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Inserts a new product row in Supabase, then refreshes the shared list
  // so both the Home page and Admin Products page update immediately.
  // Throws on failure so the calling form can show its own error message.
  async function addProduct({ name, description, image_url }) {
    const { error: insertError } = await supabase
      .from('products')
      .insert([{ name, description, image_url }])

    if (insertError) {
      console.error('Failed to add product:', insertError.message)
      throw new Error('Could not save the product. Please try again.')
    }

    await fetchProducts()
  }

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, addProduct, refreshProducts: fetchProducts }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within a ProductsProvider')
  return ctx
}
