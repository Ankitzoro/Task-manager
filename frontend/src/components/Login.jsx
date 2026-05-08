import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // THIS IS THE CONNECTION POINT
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });

      // We save the "VIP Wristband" (Token) in the browser's memory
      const token = response.data.token;
      localStorage.setItem('token', token);
      
      alert("Login Successful! Token saved.");
    } catch (error) {
      alert("Login Failed: " + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;