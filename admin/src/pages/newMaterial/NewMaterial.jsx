import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useCallback, useEffect } from "react";
import { materialInputs } from "../../formSource";
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

const NewMaterial = () => {
  const [info, setInfo] = useState({});
  const [video, setVideo] = useState(undefined);
  const {data, loading} = useFetch("/api/material");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = useCallback(async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/material/`, { ...info });
      notify(true)
    } catch (err) {
      console.log(err);
      notify(false)
    }
  }, [info]);

  useEffect(() => {
    video && uploadFile(video , "materialFile");
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
          <h1>Добавить Новость</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {materialInputs.map((input) => (
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
                <label>Загрузите документ/видео</label>
                <input id="materialFile" type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])}/>
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

export default NewMaterial;
