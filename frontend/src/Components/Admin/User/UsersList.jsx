import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import 'react-toastify/dist/ReactToastify.css';
import MetaData from '../../Layout/MetaData';
import Loader from '../../Layout/Loader';
import { errMsg, successMsg, getToken } from '../../../utils/helpers';
import axios from 'axios';

const UsersList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [isDeleted, setIsDeleted] = useState('');
  const navigate = useNavigate();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const listUsers = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/admin/users`, config);
      setAllUsers(data.users);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API}/admin/user/${id}`, config);
      setIsDeleted(data.success);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    listUsers();
    if (error) {
      errMsg(error);
      setError('');
    }
    if (isDeleted) {
      successMsg('User deleted successfully');
      navigate('/admin/users');
    }
  }, [error, isDeleted]);

  const deleteUserHandler = (id) => {
    deleteUser(id);
  };

  const columns = [
    {
      name: 'User ID',
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Role',
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <IconButton
            component={Link}
            to={`/admin/user/${row._id}`}
            color="primary"
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            aria-label="delete"
            onClick={() => deleteUserHandler(row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <MetaData title="All Users" />
      <Box display="flex">
        <Container>
          <Box textAlign="center" my={5}>
            <Typography variant="h4" component="h1">
              All Users
            </Typography>
          </Box>
          {loading ? (
            <Loader />
          ) : (
            <DataTable
              columns={columns}
              data={allUsers}
              pagination
              highlightOnHover
              responsive
              striped
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default UsersList;
