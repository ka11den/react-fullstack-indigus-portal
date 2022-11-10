import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useState } from 'react';
import { groupInputs } from '../../formSource';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { notify } from "../../components/Notify/Notify";
import { ToastContainer } from 'react-toastify';

const CreateGroup = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});

  const { data, loading } = useFetch('/api/lesson');

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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/group/create', info);
      notify(true)
    } catch (err) {
      console.log(err);
      notify(false)
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Добавление группы</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {groupInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="selectRooms">
                <label>Предметы</label>
                <select id="works" multiple onChange={handleSelect}>
                  {loading
                    ? 'loading'
                    : data &&
                      data.map((work) => (
                        <option key={work._id} value={work._id}>
                          {work.title}
                        </option>
                      ))}
                </select>
              </div>
              <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"/>
              <button onClick={handleClick}>Создать</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;