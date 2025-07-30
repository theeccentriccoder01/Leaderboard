import React from 'react';

const UserList = ({ users, selectedUser, handleUserSelect }) => {
    return (
        <div className="user-selection">
            <h2>Select User</h2>
            <select onChange={(e) => handleUserSelect(e.target.value)} value={selectedUser || ''}>
                <option value="" disabled>Select a user</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default UserList;