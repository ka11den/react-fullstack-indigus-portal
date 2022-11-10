import './App.css'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import Curs from './pages/Curs'
import HomeWork from './pages/HomeWork'
import Login from './pages/Login'
import Register from './pages/Register'
import Test from './pages/Test'
import Chat from './pages/Chat'
import News from './pages/News'
import TestList from './components/test/TestList'
import HomeworkCard from './components/homework/HomeworkCard'
import TestCard from './components/test/TestCard'
import NewList from './components/news/NewList'
import Header from './components/header/Header'
import { SchedulePage } from './pages/Schedule'

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext)

    if (!user) {
      return <Navigate to='/login' />
    }

    return children
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* dashboard */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        {/* curs */}
        <Route
          path='/curs'
          element={
            <ProtectedRoute>
              <Curs />
            </ProtectedRoute>
          }
        />
        {/* tests */}
        <Route
          path='/tests'
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />
        <Route
          path='/tests/:id'
          element={
            <ProtectedRoute>
              <TestCard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/test/:id'
          element={
            <ProtectedRoute>
              <TestList />
            </ProtectedRoute>
          }
        />
        {/* homework */}
        <Route
          path='/homework/:id'
          element={
            <ProtectedRoute>
              <HomeWork />
            </ProtectedRoute>
          }
        />
        <Route
          path='/homeworks/:id'
          element={
            <ProtectedRoute>
              <HomeworkCard />
            </ProtectedRoute>
          }
        />
        {/* chat */}
        <Route
          path='/chat'
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        {/* news */}
        <Route
          path='/news'
          element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          }
        />
        <Route
          path='/news/:id'
          element={
            <ProtectedRoute>
              <NewList />
            </ProtectedRoute>
          }
        />
        {/* schedule */}
        <Route
          path='/schedule'
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />
        {/* auth */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
