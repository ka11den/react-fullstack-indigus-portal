import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useFetch from '../hook/useFetch'

const HomeWork = () => {
  const location = useLocation()
  const lessonid = location.pathname.split('/')[2]
  const [work, setWork] = useState({data: [], loading: true})
  const { data, loading } = useFetch(`/api/lesson/find/${lessonid}`)

  useEffect(() => {
    const getWork = async () => {
      try {
        for (const workIdx in data.works) {
          axios.get(`/api/work/find/${data.works[workIdx]}`).then(({data: res}) => {
          if (res) {
            setWork(state => ({...state, data: [...state.data, res]}))
          }
          if (data.works[workIdx] === data.works[data.works.length - 1]) {
            setWork(state => ({...state, loading: false}))
          }
        })
      }
      } catch (err) {
        console.log(err)
      }
    }
    getWork()
  }, [data])

  return (
    <>
    {loading ? ("загрузка") : (
      <div className='homework container section'>
          <h1 className='section__title'>Домашние задание</h1>
          <div className='homework__container section grid'>
            <article className='homework__card'>
              <h1 className='homework__title'>{data.title}</h1>
            </article>            
            { work.loading ? <p>загрузка</p> :
              work.data.map((w, idx) => (
                <Link key={idx._id} to={`/homeworks/${w._id}`}>
                  <div className='homework__block'>
                    <div key={idx._id}>
                      <strong className='homework__desc'>{w.title}</strong> <br/>
                      <small style={{color: '#ccc'}}>{w.createdAt}</small>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      )}
      </>
  )
}

export default HomeWork