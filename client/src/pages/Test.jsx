import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import math from '../images/math.jpg'
import useFetch from '../hook/useFetch'
import { AuthContext } from '../context/AuthContext';
import { getStringLessonByIds } from '../hook/lessonById';

const Test = () => {
 const { user } = useContext(AuthContext);
 const { data, loading } = useFetch(
    `/api/lesson?ids=${getStringLessonByIds(user)}`
 );

 return (
    <>
    {loading ? (
        "загрузка"
        ) : (
        <>
            <div className='curs container section'>
                <h1 className='section__title'>Тесты</h1>
                <div className='curs__container section grid'>
                    {data.map((item) => (  
                        <article key={item._id} className='curs__card'>
                        
                        <Link to={`/test/${item._id}`}>
                            <div className='curs__data'>
                                <h1 className='curs__title'>{item.title}</h1>
                                <p className='cuts__desc'>{item.desc}</p>
                            </div>
                            <img className='curs__img' src={math} alt='img' />
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </>
    )}
    </>
)}

export default Test