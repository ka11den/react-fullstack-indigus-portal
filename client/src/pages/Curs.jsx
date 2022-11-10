import React from 'react'
import LessonList from '../components/lesson/LessonList'

const Curs = () => {
  return (
    <>
    <div className='curs container section'>
      <h1 className='section__title'>Предметы</h1>
      <div className='curs__container section grid'>
        <LessonList />
      </div>
    </div>
    </>
  )
}

export default Curs