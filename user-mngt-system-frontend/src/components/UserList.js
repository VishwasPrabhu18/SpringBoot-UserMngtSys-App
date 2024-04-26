import React, { useEffect, useState } from 'react';
import { EditUser, User } from './index';

const UserList = ({ user }) => {

  const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [responseUser, setResponseUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(USER_API_BASE_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        );
        const users = await response.json();
        setUsers(users);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, [user, responseUser]);

  const deleteUser = async (e, id) => {
    e.preventDefault();

    fetch(`${USER_API_BASE_URL}/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      if (res.ok) {
        setUsers((prevElem) => {
          return prevElem.filter((user) => user.id !== id);
        });
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  const editUser = (e, id) => {
    e.preventDefault();
    setUserId(id);
  }

  return (
    <>
      <div className='container mx-auto my-8'>
        <div className='flex shadow border-b'>
          <table className='min-w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6'>First Name</th>
                <th className='text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6'>Last Name</th>
                <th className='text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6'>Email Id</th>
                <th className='text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                loading
                  ? <tr><td colSpan={4} className='text-center px-6 py-4 whitespace-nowrap'>Loading...</td></tr>
                  : users?.map((user) => <User key={user.id} user={user} deleteUser={deleteUser} editUser={editUser} />)
              }
            </tbody>
          </table>
        </div>
      </div>
      <EditUser userId={userId} setResponseUser={setResponseUser} />
    </>
  )
}

export default UserList