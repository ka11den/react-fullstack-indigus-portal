import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hook/useFetch'
import axios from 'axios'
import { Player } from 'video-react';
import { AuthContext } from '../../context/AuthContext'

const HomeworksCard = () => {
  const location = useLocation()
  const workId = location.pathname.split('/')[2]
  const { data, loading } = useFetch(`/api/work/find/${workId}`)
  const questingLength = data?.questions?.length;
  const [step, setStep] = useState(0)
  const questionsProgress = Math.round(step / questingLength * 100);
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const userId = user.details?.fio

  const handleChange = async (e) => {
    try {
      const isChecked = e.target.checked

      setStep(state => isChecked ? ++state : --state)
      const updateProgress = {
        [e.target.id]: isChecked ? 1 : 0,
        userId
      };
      await axios.put(`/api/work/${workId}`, updateProgress) 
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
    {loading ? ("загрузка") : (
      <div className='homework container section'>
        <h1 className='section__title'>Домашние задание</h1>
        <div className='homework__container section grid'>
          <article className='homework__card'>
            <h1 className='homework__title'>{data.title}</h1>
            <div className='progress__data'>
              <div style={{"width": questionsProgress === 0 ? data.progress * 100 : questionsProgress * 2}} className='homework__progress' />
              <p className='progress__title'>{questionsProgress === 0 ? data.progress * 100 : questionsProgress}%</p>
            </div>
            <h1 className='homework__desc'>{data.desc}</h1>
            {data?.questions?.map((item) => (
              <div>
                <input type="checkbox" id='progress' onChange={handleChange} defaultChecked={data.completedWorkers.includes(userId)}  />
                <label className='checkbox__homework homework__desc'>{item}</label>
              </div>
            ))}           
          </article>
          {data.videoUrl  ?           
            <article className='homework__card'>
            <Player>
                <source src={data.videoUrl} />
              </Player>
            </article>
          : ''
          }          
        </div>
      </div>
    )}
    </>
  )
}

export default HomeworksCard