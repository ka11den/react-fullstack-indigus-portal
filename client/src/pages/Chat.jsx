import axios from 'axios';
import React, { useEffect, useContext, useState, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hook/useFetch';

const Chat = () => {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState('');
    const [selected, setSelected] = useState('');
    const userId = user.details._id;
    const [getUser, setUser] = useState('');
    const { data: users } = useFetch(`/api/users/`);

    const handleMessage = useCallback(
        async (event) => {
            event.preventDefault();
            try {
                await axios.post('/api/message/addmsg', {
                    from: userId,
                    to: selected,
                    message: msg,
                });
                setMsg('');
            } catch (err) {
                console.log('SEND MESSAGE: ', err);
            }
        },
        [msg]
    );
    useEffect(() => {
        const getMessages = async () => {
            const res = await axios.post('/api/message/getmsg', {
                from: userId,
                to: selected,
            });
            setMessages(res.data);
        };
        getMessages();
    }, [messages]);

    useEffect(() => {
        const getsUser = async () => {
            const res = await axios.get(`/api/users/${selected}`);
            setUser(res.data);
        };
        getsUser();
    }, [getUser]);

    return (
        <div className="chat container section">
            <h1 className="section__title">Чат</h1>
            <div className="chatbox">
                <div className={selected === '' ? 'none' : 'top-bar'}>
                    <div className="avatar">
                        <p>V</p>
                    </div>
                    <div className="name">{getUser.username}</div>
                    <div className="menu">
                        <div className="dots"></div>
                    </div>
                </div>
                <div className={selected === '' ? 'none' : 'middle'}>
                    <div className="voldemort">
                        {messages.map((message) => (
                            <div
                                className={
                                    message.fromSelf ? 'outgoing' : 'incoming'
                                }
                            >
                                <div className="bubble">{message.message}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={selected === '' ? 'none' : 'bottom-bar'}>
                    <form onSubmit={handleMessage} className="chat">
                        <input
                            className="chat__input"
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            type="text"
                            placeholder="Введие сообщение"
                        />
                        <button className="chat__btn" type="submit">
                            Отправить
                        </button>
                    </form>
                </div>
                <div className="messages"></div>
                <div className="profile">
                    <div className="avatar">
                        <p>H</p>
                    </div>
                    <div className="name2">
                        {user.details.username}
                        <p className="email">{user.details.email}</p>
                    </div>
                </div>
                <ul className="people">
                    {users.map((user, idx) => (
                        <li
                            onClick={setSelected.bind(null, user._id)}
                            key={user._id || idx}
                            value={user._id}
                            className="person focus"
                        >
                            <span className="title">{user.username}</span>
                            <span className="time">{user.username}</span>
                            <span className="preview">{user.username}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Chat;
