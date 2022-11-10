import React, { useContext } from 'react'
import dashboard from '../images/welcome.png'
import { AuthContext } from '../context/AuthContext'
import OrdinaryCard from '../components/ordinary/OrdinaryCard'
import EventsList from '../components/events/EventsList'
import HomeworkList from '../components/homework/HomeworkList'
import useFetch from '../hook/useFetch'
import { getStringLessonByIds } from '../hook/lessonById'

const DashBoard = () => {
  const { user } = useContext(AuthContext)
  const groups = user?.details?.groups

  const { data, loading } = useFetch(
    `/api/lesson?ids=${getStringLessonByIds(user)}`
  )

  return (
    <>
      <div className='dashboard container section'>
        <div className='welcome__data grid'>
          <div className='welcome__content'>
            <h1 className='welcome__title'>
              Добро пожаловать, {user?.details?.fio}
            </h1>
            <p className='welcome__desc'>
              Вы находитесь в группе {groups.at(-1)?.name}. Не
              забывайте смотреть вкладку новости
            </p>
          </div>
          <img className='welcome__img' src={dashboard} />
        </div>
        <OrdinaryCard />
        <div className='dashboard__container section grid'>
          <div className='dashboard__events'>
            <h1 className='events__title'>Предметы</h1>
            <EventsList lessons={data} loading={loading} />
          </div>
          <div className='dashboard__homework'>
            <h1 className='homework__title'>Домашние задание</h1>
            {data.map((lesson) => (
              <div key={lesson._id}>
                {lesson.works.length ? (
                  <HomeworkList works={lesson.works} loading={loading} />   
                ) : (
                  <p></p>               
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashBoard
