import React from 'react'

const Users = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        //cache: 'no-store',
        next: {
            revalidate: 50
        }
    });
    const data = await response.json();
  return (
    <>
        <h1>{new Date().toLocaleDateString()}</h1>
        <div>Users</div>
        {data.map((item)=> {
            return <p key={item.id}>{item.name}</p>
        })}
    </>
  )
}

export default Users


