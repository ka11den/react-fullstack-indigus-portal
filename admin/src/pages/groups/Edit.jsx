import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import { useCallback } from 'react';

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const groupid = location.pathname.split('/')[2];

  const { data, loading } = useFetch(`/api/group/${groupid}`);
  const { data: lessons, loading: lessonsLoading } = useFetch(`/api/lesson`);

  const [info, setInfo] = useState({ name: 'loading' });

  const loadedHandler = useCallback(() => {
    if (!loading) {
      setInfo((state) => ({ ...state, name: data.name }));
    }
  }, [loading]);

  useEffect(() => {
    loadedHandler();
  }, [loading]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setInfo((state) => ({ ...state, lessonIds: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/group/update/${groupid}`, info);
      navigate('/group');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Редактирование Группы</h1>
        </div>
        {!loading ? (
          <div className="bottom">
            <div className="right">
              <form onSubmit={submitHandler}>
                {!lessonsLoading ? (
                  <>
                    <div className="formInput">
                      <label htmlFor="name">Имя группы</label>
                      <input
                        id="name"
                        onChange={handleChange}
                        type="text"
                        defaultValue={info.name}
                      />
                    </div>
                    <div>
                      <strong>active:</strong>
                      {data.lessonIds?.length &&
                        data.lessonIds.map((lesson) => (
                          <div className="formInput" key={lesson._id}>
                            {lesson.title}
                          </div>
                        ))}
                    </div>
                    <select
                      multiple
                      onChange={handleSelect}
                      defaultValue={info.lessonIds}
                    >
                      {lessons?.map((f) => (
                        <option key={f._id} value={f._id}>
                          {f.title}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <p>loading</p>
                )}

                <button type="submit">Обновить</button>
              </form>
            </div>
          </div>
        ) : (
          <p>Загрузка</p>
        )}
      </div>
    </div>
  );
};

export default Edit;