import "./newLesson.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { lessonInputs } from "../../formSource";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { notify } from "../../components/Notify/Notify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewHotel = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [work, setWork] = useState([]);

  const { data, loading, error } = useFetch('/api/work');

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setWork(value);
  };
  
  console.log(files)

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newLesson = {
        ...info,
        work,
      };
      await axios.post("/api/lesson/", newLesson);
      notify(true)
    } catch (err) {
      console.log(err)
      notify(false)
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Добавление предмета</h1>
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
              <div className="selectRooms">
                <label>Домашине задание</label>
                <select id="works" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
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

export default NewHotel;
