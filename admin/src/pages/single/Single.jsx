import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from 'react-router-dom'
import { lessonInputs } from "../../formSource";
import { useState } from "react";
import axios from 'axios'

const Single = () => {
  const location = useLocation()
  const lessonid = location.pathname.split('/')[2]
  const lesson = location.pathname.split('/')[1]
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async () => {
    try {
      const updateLesson = {
        ...info,
      };

      await axios.put(`/api/${lesson}/${lessonid}`, updateLesson);
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="new">
      <Sidebar />      
      <div className="newContainer">    
      <Navbar />    
        <div className="top">
          <h1>Редактирование Предмета</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {lessonInputs.map((input) => (
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
              <button onClick={handleClick}>Обновить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
