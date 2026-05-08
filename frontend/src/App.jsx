import Login from "./components/Login"
import TodoList from "./components/TodoList"

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="App">
      <h1>My Full-Stack To-Do App</h1>
      {!token ? <Login /> : <TodoList />}
      
      {token && (
        <button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>
          Logout
        </button>
      )}
    </div>
  );
}

export default App;