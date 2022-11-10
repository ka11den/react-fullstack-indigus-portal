import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import useFetch from '../hook/useFetch'

export const SchedulePage = () => {
  const { user } = useContext(AuthContext)
  const groupId = user.details.groups.at(-1)._id
  const location = useLocation()
  const { data, loading } = useFetch(
    `/api/schedule/find/${location.state.title}?group=${groupId}`
  )

  return (
    <>
      { loading ? ( "загрузка" ) : (
      <div className='ordinary container section'>
        <h1 className='section__title'>Расписание занятии на {data[0]?.title}</h1>
        <div className='ordinary__container section grid'>
          {data.map((item) => (
            <article key={item._id} className='ordinary__card'>
              {item.lessons.map((lesson) => (
                <h1 key={lesson._id}>{lesson.title}</h1>
              ))}
            </article>
          ))}
        </div>
      </div>
    )}
    </>
  )
}
