import React, { useEffect, useState } from 'react';
import {User} from './index';

const UserList = () => {

  const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
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
                : users?.map((user) => <User key={user.id} user={user} />)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList