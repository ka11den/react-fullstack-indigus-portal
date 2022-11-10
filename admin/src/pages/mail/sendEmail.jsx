import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import React, { useState } from 'react'
import { emailInputs } from '../../formSource'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { notify } from '../../components/Notify/Notify'
import { send } from 'emailjs-com'

const SendEmail = () => {
  const [info, setInfo] = useState({})

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const sendMail = (e) => {
    e.preventDefault()
    send('service_rzx1nv9', 'template_khmwbuh', { info }, 'lhaVfuuVPSRtUvw5z')
      .then((response) => {
        console.log(
          'Сообщение успешно отправлено',
          response.status,
          response.text
        )
        notify(true)
      })
      .catch((err) => {
        notify(false)
      })
    info('')
  }
  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className='top'>
          <h1>Отправить письмо</h1>
        </div>
        <div className='bottom'>
          <div className='right'>
            <form>
              {emailInputs.map((input) => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <ToastContainer
                position='bottom-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
              />
              <button onClick={() => sendMail()}>Отправить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendEmail
