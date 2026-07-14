import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Login() {
  const { user, loading, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Already signed in — send them straight to the page they were headed
  // to (or /admin by default) instead of showing the login form.
  if (!loading && user) {
    const redirectTo = location.state?.from?.pathname || '/admin'
    return <Navigate to={redirectTo} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!email.trim() || !password) {
      setError('Email and password are required.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      await signIn(email.trim(), password)
      const redirectTo = location.state?.from?.pathname || '/admin'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message || 'Could not sign in. Please check your credentials.')
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-greige flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <span className="paw-mark" aria-hidden="true"></span>
          <span className="font-display text-3xl text-ink tracking-tight">mypet</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-cream rounded-2xl border border-ink/10 p-6 sm:p-8 space-y-6"
        >
          <h2 className="font-display text-xl text-ink">Admin Login</h2>

          <div>
            <label htmlFor="email" className="block font-body text-sm text-ink mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={submitting}
              className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm font-body text-ink placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:border-clay disabled:opacity-60"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-body text-sm text-ink mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={submitting}
              className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm font-body text-ink placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-clay/50 focus:border-clay disabled:opacity-60"
            />
          </div>

          {error && <p className="text-sm font-body text-clay">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-clay text-cream text-sm font-body px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
