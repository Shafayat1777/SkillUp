import { useState } from "react";
import { useUsersContext } from "../hooks/useUsersContext"

const UserForm = () => {
  const { dispatch } = useUsersContext()
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name, email, password };

    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json()

    if(!response.ok){
        setError(json.error)
    }
    if(response.ok){
        setName('')
        setEmail('')
        setPassword('')
        setError(null)
        console.log('new user added', json)
        dispatch({type: 'CREATE_USER', payload: json})
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add new user</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      <button>Add user</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default UserForm;
