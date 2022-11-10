import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useFetch from '../../hook/useFetch';

const HomeWork = () => {
  const location = useLocation();
  const lessonid = location.pathname.split('/')[2];
  const [work, setWork] = useState({ data: [], loading: true });
  const { data, loading } = useFetch(`/api/lesson/find/${lessonid}`);

  const getWork = async () => {
    try {
      if (data) {
        const { data: res } = await axios.get(
          `/api/test/find-all/${lessonid}?ids=${data.tests?.join(';')}`
        );
        setWork((state) => ({ ...state, loading: false, data: res }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWork();
  }, [data]);

  return (
    <>
      {loading ? (
        'загрузка'
      ) : (
        <div className='homework container section'>
          <h1 className='section__title'>Домашние задание</h1>
          <div className='homework__container section grid'>
            <article className='homework__card'>
              <h1 className='homework__title'>{data.title}</h1>
            </article>
            {work.loading ? (
              <p>загрузка</p>
            ) : (
              work.data.map((w, idx) => (
                <Link to={`/tests/${w._id}`}>
                  <div key={w._id} className='homework__block'>
                    <div key={idx}>
                      <strong className='homework__desc'>{w.title}</strong>{' '}
                      <br />
                      <small style={{ color: '#ccc' }}>{w.variants}</small>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeWork;
