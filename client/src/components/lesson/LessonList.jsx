import React from 'react'
import math from '../../images/math.jpg'
import useFetch from '../../hook/useFetch'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { getStringLessonByIds } from '../../hook/lessonById'
import { useContext } from 'react'

const LessonList = () => {
  const { user } = useContext(AuthContext)
  const { data, loading } = useFetch(
    `/api/lesson?ids=${getStringLessonByIds(user)}`
  )

  return (
    <>
      {loading ? (
        'загрузка'
      ) : (
        <>
          {data.map((item) => (
            <article key={item._id} className='curs__card'>
              <Link to={`/homework/${item._id}`}>
                <div className='curs__data'>
                  <h1 className='curs__title'>{item.title}</h1>
                  <p className='cuts__desc'>{item.desc}</p>
                </div>
                <img className='curs__img' src={math} alt='img' />
              </Link>
            </article>
          ))}
        </>
      )}
    </>
  )
}
export default LessonList
