import React from 'react';

function Account(props) {
  const user = props.userData[0];
  console.log(user);
  return (
    <div className='account'>
      <h1>Account Page</h1>
      <p>Welcome, {user.name}!</p>
      <p>Your email is {user.email}.</p>
    </div>
  );
}

export default Account;