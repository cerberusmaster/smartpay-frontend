import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import RequireAuth from './features/auth/RequireAuth';
import Dashboard from './features/wallet/Dashboard';
import AdminUsers from './features/admin/Users';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import SidebarLayout from './layouts/SidebarLayout';
import SendMoney from './features/wallet/SendMoney';
import TransactionHistory from './features/wallet/TransactionHistory';
import AdminLayout from './layouts/AdminLayout';
import Transactions from './features/admin/Transactions';
import Wallets from './features/admin/Wallets';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<PublicLayout />} >
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route element={<SidebarLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/send" element={<SendMoney />} />
              <Route path="/transactions" element={<TransactionHistory />} />
            </Route>
            <Route path='/admin' element={<AdminLayout />}>
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/transactions" element={<Transactions />} />
              <Route path="/admin/wallets" element={<Wallets />} />
            </Route>
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
