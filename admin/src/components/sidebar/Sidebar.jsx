import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EmailIcon from '@mui/icons-material/Email';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DescriptionIcon from '@mui/icons-material/Description';
import QuizIcon from '@mui/icons-material/Quiz';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ИндигуС</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Главное</p>
          <Link to="/" tyle={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Панель</span>
          </li>
          </Link>
          <p className="title">Управление</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Пользователи</span>
            </li>
          </Link> 
          <Link to="/group" style={{ textDecoration: "none" }}>
            <li>
              <GroupsIcon className="icon" />
              <span>Группы</span>
            </li>
          </Link>
          <Link to="/schedule" style={{ textDecoration: "none" }}>
            <li>
              <CalendarMonthIcon className="icon" />
              <span>Расписание</span>
            </li>
          </Link>
          <Link to="/material" style={{ textDecoration: "none" }}>
            <li>
              <CollectionsBookmarkIcon className="icon" />
              <span>Материалы</span>
            </li>
          </Link>
          <Link to="/lesson" style={{ textDecoration: "none" }}>
            <li>
              <DescriptionIcon className="icon" />
              <span>Предметы</span>
            </li>
          </Link>
          <Link to="/test" style={{ textDecoration: "none" }}>
            <li>
              <QuizIcon className="icon" />
              <span>Тесты</span>
            </li>
          </Link>
          <Link to="/work" style={{ textDecoration: "none" }}>
            <li>
              <HomeWorkIcon className="icon" />
              <span>Домашние Задание</span>
            </li>
          </Link>
          <Link to="/news" style={{ textDecoration: "none" }}>
            <li>
              <NewspaperIcon className="icon" />
              <span>Новостная лента</span>
            </li>
          </Link>
          <Link to="/mails" style={{ textDecoration: "none" }}>
            <li>
              <EmailIcon className="icon" />
              <span>Почта</span>
            </li>
          </Link>
          <p className="title">Успеваемость</p>
          <Link to="/grades/test" style={{ textDecoration: "none" }}>
            <li>
              <QuizIcon className="icon" />
              <span>Тесты</span>
            </li>
          </Link>
          <Link to="/grades/work" style={{ textDecoration: "none" }}>
            <li>
              <HomeWorkIcon className="icon" />
              <span>Домашние Задание</span>
            </li>
          </Link>
          <p className="title">Другое</p>
          <Link to="/chat" style={{ textDecoration: "none" }}>
            <li>
              <ChatIcon className="icon" />
              <span>Чат</span>
            </li>
          </Link>
          <p className="title">Пользователь</p>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Выйти</span>
          </li>         
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
