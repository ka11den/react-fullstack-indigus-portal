import React from 'react'
import math from '../../images/math.png'
import { Link } from 'react-router-dom'

const EventsCard = ({ lessons, loading }) => {
  return (
    <>
      {loading ? (
        'загрузка'
      ) : (
        <>
          {lessons.length &&
            lessons.map((item) => (
              <Link key={item._id} to={`/homework/${item._id}`}>
                <article className='events__card grid'>
                  <img className='events__img' src={math} alt='math' />
                  <div className='events__content'>
                    <h1 className='events__title'>{item.title}</h1>
                    <p className='events__desc'>{item.desc}</p>
                  </div>
                </article>
              </Link>
            ))}
        </>
      )}
    </>
  )
}

export default EventsCard
