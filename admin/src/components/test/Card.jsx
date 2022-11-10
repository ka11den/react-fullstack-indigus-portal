import React, { useCallback, useState } from 'react'

export const TestCard = ({ onChange, id, onChangeVariant }) => {
  const [variants, setVariants] = useState({ value: [], correct: [] })
  const [count, setCount] = useState(1)

  const changeInputHandler = useCallback((e) => {
    onChange(e, id)
  }, [])

  const changeVariant = useCallback((event, idx) => {
    const prop = event.target.name

    setVariants((state) => {
      if (prop === 'correct') {
        if (event.target.checked) {
          state[prop].push(idx)
        } else {
          state[prop] = state[prop].filter((i) => i !== idx)
        }
      } else {
        state[prop][idx] = event.target.value
      }

      return state
    })

    setCount(variants.value.length + 1)
    onChangeVariant(variants, id)
  }, [])

  return (
    <div className='bottom'>
      <div className='right'>
        <div className='formInput'>
          <label>Вопрос #{id + 1}</label>
          <textarea
            placeholder='Я черный'
            name='title'
            onChange={changeInputHandler}
          />
        </div>
      </div>

      <div>
        {Array.from({ length: count }).map((v, idx) => (
          <div key={idx} style={{ display: 'flex' }}>
            <div
              className='formInput'
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <label>Вариант ответа: </label>
              <input
                type='text'
                name='value'
                id=''
                onChange={(e) => changeVariant(e, idx)}
              />
            </div>
            <div
              className='formInput'
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <label>Корректный</label>
              <input
                type='checkbox'
                name='correct'
                onChange={(e) => changeVariant(e, idx)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
