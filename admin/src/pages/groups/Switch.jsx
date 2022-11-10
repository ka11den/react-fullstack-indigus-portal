import React from 'react';
import { useCallback } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SwitchGroup = () => {
  const location = useLocation();

  const userId = location.pathname.split('/')[3];
  const { data: user } = useFetch(`/api/users/${userId}`);
  const { data, loading } = useFetch(`/api/group/`);

  const handleClick = useCallback(async (state, groupId) => {
    try {
      await axios.post(`/api/users/toggle-group?isExist=${+state}`, {
        userId,
        groupId,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Добавление группы</h1>
        </div>
        <div className="bottom">
          {loading ? (
            <p>loading</p>
          ) : !data.length ? (
            <p>нет групп</p>
          ) : (
            <section>
              {data.map((d) => (
                <React.Fragment key={d._id}>
                  <div className="left">
                    <option>{d.name}</option>
                  </div>
                  <div className="right">
                    <input
                      type="checkbox"
                      onChange={(e) => handleClick(e.target.checked, d._id)}
                      value={user?.details?.groups?.some(
                        (g) => g._id === d._id
                      )}
                      defaultChecked={user?.details?.groups?.some(
                        (g) => g._id === d._id
                      )}
                    />
                  </div>
                </React.Fragment>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwitchGroup;