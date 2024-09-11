import React from 'react';

const UserManagement = ({ users, approveUser }) => {
  return (
    <div>
      <h2>User Management</h2>
      {users.map((user) => (
        <div key={user._id}>
          <p>{user.name}</p>
          <button onClick={() => approveUser(user._id)}>Approve</button>
        </div>
      ))}
    </div>
  );
};

export default UserManagement;
