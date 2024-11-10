import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { ThemeProvider } from './components/ui/theme-provider'
import "./App.css"
import ProtectedRoute from './middlewares/ProtectedRoute'
import EmployeeList from './pages/EmployeeList'
import CreateEmployee from './pages/CreateEmployee'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      },
      {
        path: '/employees',
        element: <ProtectedRoute>
          <EmployeeList />
        </ProtectedRoute>
      },
      {
        path: '/create-employee',
        element: <ProtectedRoute>
          <CreateEmployee />
        </ProtectedRoute>
      }
    ]
  }
])

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router } />
    </ThemeProvider>

  )
}

export default App