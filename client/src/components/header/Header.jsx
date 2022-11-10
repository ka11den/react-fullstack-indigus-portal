import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
// export icon
import NewspaperIcon from '@mui/icons-material/Newspaper';
import QuizIcon from '@mui/icons-material/Quiz';
import ChatIcon from '@mui/icons-material/Chat';
import GridViewIcon from '@mui/icons-material/GridView';
import BookIcon from '@mui/icons-material/Book';

const Header = () => {
    const { user } = useContext(AuthContext)
    const [ active, setActive ] = useState('home')

    const handleClick = (value) => {
      setActive(value)
    }
    
    return (
      <div className={user ? 'nav' : 'none'} id="nav">
        <nav className="nav__content">
          <h1 className='nav__logo'>ИндигуС</h1>
          <div className="nav__list">

            <Link to='/' className={active === 'home' ? 'nav__link active' : 'nav__link'} onClick={() => handleClick('home')}>
              <GridViewIcon />
              <span className={active === 'home' ? 'nav__nameis' : 'nav__name'}>Панель</span>
            </Link>

            <Link to='/news' className={active === 'news' ? 'nav__link active' : 'nav__link'} onClick={() => handleClick('news')}>
            <NewspaperIcon/>
              <span className={active === 'news' ? 'nav__nameis' : 'nav__name'}>Новости</span>
            </Link>

            <Link to='/curs' className={active === 'curs' ? 'nav__link active' : 'nav__link'} onClick={() => handleClick('curs')}>
              <BookIcon />
              <span className={active === 'curs' ? 'nav__nameis' : 'nav__name'}>Предметы</span>
            </Link>

            <Link to='/tests' className={active === 'tests' ? 'nav__link active' : 'nav__link'} onClick={() => handleClick('tests')}>
              <QuizIcon/>
              <span className={active === 'tests' ? 'nav__nameis' : 'nav__name'}>Тесты</span>
            </Link>

            <Link to='/chat' className={active === 'chat' ? 'nav__link active' : 'nav__link'} onClick={() => handleClick('chat')}>
              <ChatIcon />
              <span className={active === 'chat' ? 'nav__nameis' : 'nav__name'}>Чат</span>
            </Link>
            
          </div>
        </nav>
      </div>
    )
}

export default Header