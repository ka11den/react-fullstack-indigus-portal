import React from 'react'
import { Link } from 'react-router-dom'

const OrdinaryCard = () => {
  return (
    <div className='ordinary section'>
      <div className='ordinary__data grid'>
        <h1 className='ordinary__title'>Расписание</h1>
        <div className='ordinary__content'>
          <Link to='/schedule' state={{ title: 'monday' }}>
            <h1 className='ordinaty__week'>Понедельник</h1>
          </Link>
          <Link to='/schedule' state={{ title: 'tuesday' }}>
            <h1 className='ordinaty__week' state={{ title: 'tuesday' }}>
              Втроник
            </h1>
          </Link>
          <Link to='/schedule' state={{ title: 'wednesday' }}>
            <h1 className='ordinaty__week' state={{ title: 'wednesday' }}>
              Среда
            </h1>
          </Link>
          <Link to='/schedule' state={{ title: 'thursday' }}>
            <h1 className='ordinaty__week' state={{ title: 'thursday' }}>
              Четверг
            </h1>
          </Link>
          <Link to='/schedule' state={{ title: 'friday' }}>
            <h1 className='ordinaty__week' state={{ title: 'friday' }}>
              Пятница
            </h1>
          </Link>
          <Link to='/schedule' state={{ title: 'saturday' }}>
            <h1 className='ordinaty__week' state={{ title: 'saturday' }}>
              Суббота
            </h1>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrdinaryCard
