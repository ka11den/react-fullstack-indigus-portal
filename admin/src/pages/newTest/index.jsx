import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useState, useCallback, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import 'react-toastify/dist/ReactToastify.css'
import { TestCard } from '../../components/test/Card'
import { SvgIcon } from '../../components/ui/svgIcon/svgIcon'
import axios from 'axios'

const NewTest = () => {
  const { data: lessons, loading: lessonsLoading } = useFetch('/api/lesson')
  const [countCard, setCountCard] = useState(1)

  const [test, setTest] = useState({
    lesson: lessons[0]?._id,
    title: '',
    questions: [],
  })

  useEffect(() => {
    if (lessons) {
      setTest((state) => ({ ...state, lesson: lessons[0]?._id }))
    }
  }, [lessons])

  const addCard = useCallback(() => {
    setCountCard((state) => state + 1)
  }, [])

  const changeInputHandler = useCallback((event, id) => {
    const {
      target: { value, name },
    } = event

    setTest((state) => {
      state.questions[id] = { ...state.questions[id], [name]: value }
      return state
    })
  }, [])

  const changeQuestionsHandler = useCallback(({ value, correct }, id) => {
    setTest((state) => {
      state.questions[id] = { ...state.questions[id], variants: value, correct }
      return state
    })
  }, [])

  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault()
      try {
        console.log('FINALLY TEST: ', test)
        await axios.post(`/api/test/${test.lesson}`, test)
      } catch (err) {
        console.log('Create Test: ', err)
      }
    },
    [test]
  )

  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div
          className='top'
          style={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            <h1>Создание Теста</h1>
          </div>

          <div>
            <label>Выберите предмет</label>
            <select
              id='lessonId'
              onChange={(e) =>
                setTest((state) => ({ ...state, lesson: e.target.value }))
              }
            >
              {lessonsLoading
                ? 'loading'
                : lessons &&
                  lessons.map((lesson) => (
                    <option key={lesson._id} value={lesson._id}>
                      {lesson.title}
                    </option>
                  ))}
            </select>
          </div>
        </div>

        <form onSubmit={submitHandler}>
          <div className='right'>
            <div className='formInput'>
              <label>Заголовок теста</label>
              <textarea
                name='title'
                onChange={(e) =>
                  setTest((state) => ({ ...state, title: e.target.value }))
                }
              />
            </div>
          </div>

          {Array.from({ length: countCard }).map((_, idx) => (
            <TestCard
              key={idx}
              id={idx}
              onChange={changeInputHandler}
              onChangeVariant={changeQuestionsHandler}
            />
          ))}

          <button onClick={addCard} type='button'>
            <SvgIcon name='plus' style={{ height: 20, width: 20 }} />
          </button>
          <button type='submit'>Отправить</button>
        </form>
      </div>
    </div>
  )
}

export default NewTest

{
  /* <ToastContainer
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
              /> */
}
