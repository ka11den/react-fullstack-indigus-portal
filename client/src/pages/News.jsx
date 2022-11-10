import React from 'react'
import useFetch from '../hook/useFetch';
import { Link } from 'react-router-dom'

const News = () => {
  const { data, loading, error } = useFetch(`/api/news/`)
  return (
    <>
    {loading ? ( "загрузка" ) : (
        <div className='news container section'>
            <h1 className='section__title'>Новости</h1>
            <div className='news__container section grid'>
                {data.map((item) => (                    
                    <article key={item._id} className='new__card'>
                        <Link to={`/news/${item._id}`}>
                        <div className='new__data grid'>
                            <h1 className='news__title'>{item.title}</h1>
                            {item.desc.length >= 100 ? (
                                <>
                                <p className='news__desc'>{item.desc.slice(0, 100)}</p>
                                <div>
                                <button className='new__btn'>Читать дальше</button>
                                </div>
                                </>
                            ) : (
                                <p className='news__desc'>{item.desc}</p>
                            )}                           
                        </div>
                        </Link>
                    </article>                    
                ))}
            </div>
        </div>
    )}
    </>
  )
}

export default News