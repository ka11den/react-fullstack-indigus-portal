import React from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../hook/useFetch'

const NewCard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const newId = location.pathname.split('/')[2]
  const { data, loading } = useFetch(`/api/news/find/${newId}`)
  
  return (
    <>
    {loading ? ("загрузка") : (
      <div className='news container'>
        <div className='news__container section grid'>
          <article className='new__card'>
            <h1 className='new__title'>{data.title}</h1>
            <p className='new__desc'>{data.desc}</p>
            <img src={data?.fileUrl}/>
          </article>
        </div>
      </div>
    )}
    </>
  )
}

export default NewCard