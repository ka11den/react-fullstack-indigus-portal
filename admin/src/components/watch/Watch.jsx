import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { notify } from "../../components/Notify/Notify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Watch = () => {
  const { data, loading, error } = useFetch('/api/material/');
  console.log(data.materialFile)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Просмотр</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
                {data.map((item) => (
                    <>
                    <h1 className='formInput'>{item.title}</h1>
                    <h1 className='formInput'>{item.desc}</h1>
                    <Link to={item.materialFile}>Download</Link>
                    </>
                ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Watch