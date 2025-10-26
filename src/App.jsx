import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Navber from './components/Navber'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { RouterProvider } from 'react-router'
import { Toaster } from '@/components/ui/sonner'

const router = createBrowserRouter([
  {
    path:'/',
    element: <> <Navber/><Home/></>
  },
  {
    path:'/login',
    element: <> <Login/></>
  },
  {
    path:'/signup',
    element: <> <SignUp/></>
  }
])

const App = () => {
  return (
    <>
    <RouterProvider router={router}/>
    <Toaster />
    </>
  )
}

export default App
