import React, { useEffect, useState } from 'react'

function App() {

  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  
  async function loadUsers() {
    const response = await fetch(import.meta.env.VITE_API + '/users')
    const data = await response.json()
    setUsers(data.users)
  }

  useEffect(() => {
    loadUsers();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(import.meta.env.VITE_API + '/users', {
      method: 'POST',
      body: JSON.stringify({name}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    loadUsers()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="name" placeholder='Insert your name' onChange={e => setName(e.target.value)} />
        <button>Save</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
