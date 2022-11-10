import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCallback } from "react";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split('/')[1] === 'grades' ? location.pathname.split('/')[2] : location.pathname.split('/')[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/api/${path}`);
  const navigate = useNavigate();

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const handleEdit = (id) => {
    navigate(`/${path}/${id}`)
  }

  const addGroup = useCallback((id) => {
    navigate(`/users/group/${id}`)
  }, [])

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 500,
      renderCell: (params) => {
        return (
          <div className="cellAction">           
              <div className="viewButton"
              onClick={() => handleEdit(params.row._id)}>Редактировать</div>
              {
                location.pathname === '/users' 
                &&
                (
                  <div
                    className="viewButton"
                    onClick={() => addGroup(params.row._id)}
                  >
                    Изменить группу
                  </div>
                )
              }
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Удалить
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className='datatable'>
      <div className='datatableTitle'>
        {path}
        <Link to={`/${path}/new`} className='link'>
          Добавить
        </Link>
        <Link to={`/${path}/watch`} className='link'>
          Просмотреть
        </Link>
      </div>
      <DataGrid
        className='datagrid'
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
