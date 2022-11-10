import "./newHomework.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useCallback, useEffect } from "react";
import { workInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {app} from '../../firebase'
import { notify } from "../../components/Notify/Notify";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [works, setWorks] = useState('');
  const [video, setVideo] = useState(undefined);
  const {data, loading} = useFetch("/api/lesson");
  const [lessonId, setLessonId] = useState(data[0]?._id || null);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = useCallback(async (e) => {
    e.preventDefault();
    const questions = works
                      .split(",")
                      .map((work) => work)
    try {
      await axios.post(`/api/work/${lessonId}`, { ...info, questions });
      notify(true)
    } catch (err) {
      console.log(err);
      notify(false)
    }
  }, [lessonId, works, info]);

  useEffect(() => {
    if (data) {
      setLessonId(data[0]?._id)
    }
  }, [data])

  useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInfo((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };
  
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Добавить Домашние Задание</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {workInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Задание</label>
                <textarea
                  onChange={(e) => setWorks(e.target.value)}
                  placeholder="1. Сделаеть упражнение 2 3"
                />
              </div>
              <div className="formInput">
                <label>Выберите предмет</label>
                <select
                  id="lessonId"
                  onChange={(e) => setLessonId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((lesson) => (
                        <option key={lesson._id} value={lesson._id}>{lesson.title}</option>
                      ))}
                </select>
              </div>
              <div className="formInput">
                <label>Загрузите видео</label>
                <input id="videoUrl" type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])}/>
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
              <button onClick={handleClick}>Отправить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
