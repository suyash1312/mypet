import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProductsProvider } from './contexts/ProductsContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import AdminLayout from './pages/admin/AdminLayout'
import ProductList from './pages/admin/ProductList'
import AddProduct from './pages/admin/AddProduct'

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ProductList />} />
              <Route path="add" element={<AddProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App
