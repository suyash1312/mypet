import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../../contexts/ProductsContext'

const PLACEHOLDER_IMAGE = 'https://picsum.photos/600'

function AddProduct() {
  const { addProduct } = useProducts()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (!name.trim() || !description.trim()) {
      setError('Product name and description are required.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      await addProduct({
        name: name.trim(),
        description: description.trim(),
        image_url: PLACEHOLDER_IMAGE,
      })
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Something went wrong while saving. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl">
      <h2 className="font-display text-2xl text-ink mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="bg-cream rounded-2xl border border-ink/10 p-6 sm:p-8 space-y-6">
        <div>
          <label htmlFor="name" className="block font-body text-sm text-ink mb-1.5">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Cedar Chip Bedding"
            disabled={submitting}
            className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm font-body text-ink placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:border-clay disabled:opacity-60"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-body text-sm text-ink mb-1.5">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is it, and what does it do for the pet?"
            rows={4}
            disabled={submitting}
            className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm font-body text-ink placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:border-clay resize-none disabled:opacity-60"
          />
        </div>

        {error && <p className="text-sm font-body text-clay">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-clay text-cream text-sm font-body px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving\u2026' : 'Save'}
        </button>
      </form>
    </div>
  )
}

export default AddProduct
