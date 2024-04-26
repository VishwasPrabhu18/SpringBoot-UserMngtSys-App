const User = ({ user, deleteUser, editUser }) => {
    return (
        <tr>
            <td className='text-left px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>{user.firstName}</div>
            </td>
            <td className='text-left px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>{user.lastName}</div>
            </td>
            <td className='text-left px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>{user.emailId}</div>
            </td>
            <td className='text-right px-6 py-4 whitespace-nowrap flex justify-end gap-10'>
                <a href='#' onClick={(e, id) => editUser(e, user.id)} className='text-indigo-600 hover:text-indigo-800 cursor-pointer'>Edit</a>
                <a href='#' onClick={(e, id) => deleteUser(e, user.id)} className='text-red-600 hover:text-red-800 cursor-pointer'>Delete</a>
            </td>
        </tr>
    )
}

export default User