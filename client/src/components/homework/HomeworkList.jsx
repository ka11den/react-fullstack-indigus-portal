import React from 'react'
import math from '../../images/math.png'

const HomeworkCard = ({ works, loading }) => {
  return (
    <>
      {loading ? (
        'загрузка'
      ) : (
        <>
          {works.map((item) => (
            <article key={item._id} className='homework__card grid'>
              <img className='events__img' src={math} />
              <div className='homework__content'>
                <h1 className='homework__title'>{item.title}</h1>
                <p className='homework__desc'>{item.desc}</p>
                <div className='progress__data'>
                  <div
                    className='homework__progress'
                    style={{ width: item.progress * 100 }}
                  />
                  <p className='progress__title'>{item.progress * 100}%</p>
                </div>
              </div>
            </article>
          ))}
        </>
      )}
    </>
  )
}

export default HomeworkCard
