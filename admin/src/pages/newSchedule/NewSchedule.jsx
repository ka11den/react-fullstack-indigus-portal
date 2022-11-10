import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useState, useCallback, useEffect } from 'react'
import { scheduleInputs } from '../../formSource'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { notify } from '../../components/Notify/Notify'

const NewSchedule = () => {
  const { data, loading } = useFetch('/api/group')
  const [groupId, setGroupId] = useState(undefined)
  const { data: lessons } = useFetch(`/api/lesson`)

  useEffect(() => {
    if (data.length) {
      setGroupId(data[0]._id)
    }
  }, [data])

  const [days, setDays] = useState([
    { title: 'Понедельник', validUntil: new Date().setDate(0) },
    { title: 'Вторник', validUntil: new Date().setDate(1) },
    { title: 'Среда', validUntil: new Date().setDate(2) },
    { title: 'Четверг', validUntil: new Date().setDate(3) },
    { title: 'Пятница', validUntil: new Date().setDate(4) },
    { title: 'Суббота', validUntil: new Date().setDate(5) },
  ])

  const handleChange = useCallback(
    (e) => {
      const {
        target: {
          dataset: { id },
          selectedOptions,
        },
      } = e
      const value = Array.from(selectedOptions, (option) => option.value)

      setDays((state) => {
        state[id].lessons = value
        return state
      })
    },
    [groupId]
  )

  const handleClick = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        await Promise.all([
          days.forEach(async (day) => {
            await axios.post(`/api/schedule/${groupId}`, {
              ...day,
              group: groupId,
            })
          }),
        ])
        notify(true)
      } catch (err) {
        console.log(err)
        notify(false)
      }
    },
    [groupId, days]
  )

  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className='top'>
          <h1>Добавить расписание</h1>
        </div>
        <div className='bottom'>
          <div className='right'>
            <form>
              {days.map((day, idx) => (
                <div className='formInput' key={idx}>
                  <div>
                    <label>День недели</label>
                    <input type='text' disabled placeholder={day.title} />
                  </div>

                  <div>
                    <select multiple data-id={idx} onChange={handleChange}>
                      {lessons.map((lesson) => (
                        <option
                          onChange={handleChange}
                          value={lesson._id}
                          key={lesson._id}
                        >
                          {lesson.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}

              <div className='formInput'>
                <label>Выберите группу</label>
                <select
                  id='groupId'
                  onChange={(e) => setGroupId(e.target.value)}
                >
                  {loading
                    ? 'loading'
                    : data &&
                      data.map((group) => (
                        <option key={group._id} value={group._id}>
                          {group.name}
                        </option>
                      ))}
                </select>
              </div>
              <ToastContainer
                position='bottom-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
              />
              <button onClick={handleClick}>Отправить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewSchedule
