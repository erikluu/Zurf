import React from 'react';

function Account(props) {
  const user = props.userData;
  console.log(user);
  return (
    <div className='account'>
      <h1>Account Page</h1>
      <p>Welcome, {user["name"]}</p>
    </div>
  );
}

export default Account;