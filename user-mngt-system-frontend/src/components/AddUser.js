import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import UserList from './UserList';


const AddUser = () => {

  const [isOpen, setisOpen] = useState(false);
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: ""
  });
  const [responseUser, setResponseUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: ""
  });

  function closeModel() {
    setUser({
      id: "",
      firstName: "",
      lastName: "",
      emailId: ""
    });
    setisOpen(false);
  }

  function openModel() {
    setisOpen(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const saveUser = async (e) => {
    e.preventDefault();
    const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

    try {
      const response = await fetch(USER_API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      if (response.ok) {
        const _user = await response.json();
        setResponseUser(_user);
        closeModel();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <div className='container mx-auto my-8'>
        <div className='h-12'>
          <button className='rounded bg-slate-600 text-white px-6 py-2 font-semibold hover:bg-slate-700 cursor-pointer' onClick={openModel}>Add User</button>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto' onClose={closeModel}>
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded'>
                <Dialog.Title as='h3' className="text-lg font-medium leading-6 text-gray-900">Add New User</Dialog.Title>
                <div className='flex max-w-md mx-auto'>
                  <div className='py-2 flex flex-col'>
                    <div className='h-14 my-4'>
                      <label className='block text-gray-600 text-sm font-normal'>First Name</label>
                      <input type='text' name="firstName" value={user.firstName} onChange={handleInputChange} className="h-10 w-96 border mt-2 px-2 py-2 rounded focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div className='h-14 my-4'>
                      <label className='block text-gray-600 text-sm font-normal'>Last Name</label>
                      <input type='text' name="lastName" value={user.lastName} onChange={handleInputChange} className="h-10 w-96 border mt-2 px-2 py-2 rounded focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div className='h-14 my-4'>
                      <label className='block text-gray-600 text-sm font-normal'>Email Id</label>
                      <input type='email' name="emailId" value={user.emailId} onChange={handleInputChange} className="h-10 w-96 border mt-2 px-2 py-2 rounded focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div className='h-14 my-4 space-x-4 pt-4'>
                      <button className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6' onClick={saveUser}>Save</button>
                      <button className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6' onClick={closeModel}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      
      <UserList user={responseUser} />
    </>
  )
}

export default AddUser