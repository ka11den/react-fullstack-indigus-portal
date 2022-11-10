import axios from 'axios';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hook/useFetch';
import confity from '../../images/confity.png'
import { AuthContext } from '../../context/AuthContext'

const TestsCard = () => {
  const location = useLocation();
  const testid = location.pathname.split('/')[2];
  const { data, loading } = useFetch(`/api/test/find/${testid}`);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ answers: [], correct: 0 });
  const [isFinished, setIsFinished] = useState(false);
  const { user } = useContext(AuthContext)
  const userId = user.details?.fio

  const onClick = async (index, correct) => {
    setAnswers((state) =>
      isFinished
        ? state
        : {
            answers: [...state.answers, index],
            correct: index === correct ? state.correct++ : state.correct,
          }
    );
    if (step + 1 === data.questions.length) {
      setIsFinished(true);
      const updateTest = {
        completedTests: userId,
      };
      await axios.put(`/api/test/${testid}`, updateTest) 
      return;
    }
    setStep((state) => ++state);
  };
  
  return (
    <>
      {loading ? (
        'загрузка'
      ) : (
        <div className='homework container section'>
          <h1 className='section__title'>Решаем тест</h1>
          <div className='homework__container section grid'>
            {isFinished !== true ? (
              <Game
              step={step}
              onClick={onClick}
              question={data?.questions?.[step]}
            />
            ) : (
              <Result res={answers} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

const Game = ({ step, question, onClick }) => {
  return (
    <article className='test__article'>
      <div className='progress'>
        <div className='progress__bar' style={{ width: '50%' }} />
      </div>
      <h1 className='test__title'>
        {step + 1}. {question?.title}
      </h1>
      <ul className='test__list'>
        {question?.variants?.map((variant, index) => (
          <li
            onClick={() => onClick(index, question?.correct?.[0])}
            key={variant}
            className='test__desription'
          >
            {variant}
          </li>
        ))}
      </ul>
    </article>
  );
};

const Result = ({ res }) => {
  console.log(res)
  return (
    <article className='game__article'>
      <img className='test__img' src={confity}/>
      <h1 className='test__title'>Вы ответили {JSON.stringify(res.correct)} из {JSON.stringify(res.answers.length)}</h1>
      {res.correct / res.answers.length >= 1 ? (
        <h1 className='test__title'>Молодец!</h1>
      ) : (
        <h1 className='test__title'>Попробуй еще раз</h1>
      )}
      <br />
    </article>
  );
};

export default TestsCard;
