import './style/dark.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { userInputs } from './formSource'
import { useContext } from 'react'
import { DarkModeContext } from './context/darkModeContext'
import { AuthContext } from './context/AuthContext'
import {
  workColumns,
  lessonColumns,
  testColumns,
  userColumns,
  newColumns,
  groupColumns,
  materialColumns,
  gradesWorkColumns,
  gradesTestColumns,
  scheduleColumns,
} from './datatablesource'
import NewLesson from './pages/newLesson/NewLesson'
import NewHomework from './pages/newHomework/NewHomework'
import NewTest from './pages/newTest'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import List from './pages/list/List'
import Single from './pages/single/Single'
import New from './pages/new/New'
import NewNews from './pages/newNews/NewNews'
import CreateGroup from './pages/groups/Create'
import SwitchGroup from './pages/groups/Switch'
import EditGroup from './pages/groups/Edit'
import SendEmail from './pages/mail/sendEmail'
import NewMaterial from './pages/newMaterial/NewMaterial'
import Watch from './components/watch/Watch'
import Chat from './pages/chat/Chat'
import NewSchedule from './pages/newSchedule/NewSchedule'

function App() {
  const { darkMode } = useContext(DarkModeContext)

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext)

    if (!user) {
      return <Navigate to='/login' />
    }

    return children
  }

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='login' element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path='users'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':userId'
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path='group/:groupId'
                element={
                  <ProtectedRoute>
                    <SwitchGroup />
                  </ProtectedRoute>
                }
              />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <New
                      inputs={userInputs}
                      title='Добавить нового пользователя'
                    />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="group">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={groupColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":groupId"
                element={
                  <ProtectedRoute>
                    <EditGroup />
                  </ProtectedRoute>
                }
              />
              <Route path="new" element={<CreateGroup />} />
            </Route>
            <Route path='lesson'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={lessonColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':lessonId'
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <NewLesson />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='test'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={testColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':testId'
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <NewTest />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='schedule'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={scheduleColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':scheduleId'
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <NewSchedule />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='grades/work'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={gradesWorkColumns} />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='grades/test'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={gradesTestColumns} />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='work'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={workColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':workId'
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <NewHomework />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='material'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={materialColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':materialId'
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path='watch'
                element={
                  <ProtectedRoute>
                    <Watch />
                  </ProtectedRoute>
                }
              />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <NewMaterial />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='group'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={groupColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':groupId'
                element={
                  <ProtectedRoute>
                    <EditGroup />
                  </ProtectedRoute>
                }
              />
              <Route path='new' element={<CreateGroup />} />
            </Route>
            <Route path='mails'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <SendEmail />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/* f */}
            <Route path='news'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={newColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':newId'
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <NewNews />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='chat'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
