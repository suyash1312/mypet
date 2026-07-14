import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-full text-sm font-body transition-colors duration-150 ${
    isActive ? 'bg-ink text-cream' : 'text-ink/70 hover:text-ink hover:bg-ink/5'
  }`

function AdminLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-greige">
      <header className="max-w-6xl mx-auto px-6 sm:px-10 pt-14 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="paw-mark" aria-hidden="true"></span>
            <span className="font-display text-3xl sm:text-4xl text-ink tracking-tight">mypet</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-body text-sm uppercase tracking-wide text-ink/50">Admin</span>
            <button
              type="button"
              onClick={handleLogout}
              className="font-body text-sm text-ink/70 hover:text-clay transition-colors duration-150"
            >
              Logout
            </button>
          </div>
        </div>

        <nav className="mt-8 flex gap-2">
          <NavLink to="/admin" end className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/admin/add" className={navLinkClass}>
            Add Product
          </NavLink>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 sm:px-10 pb-20">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
