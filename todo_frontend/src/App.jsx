import { useState,useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/todos").then(response => response.json()).then(data => {
      console.log("Datos recibidos de Rails: ", data)
      setTodos(data)
    })
    .catch(error => console.error("Error conectando con Rails:", error))
  }, [])

  return (
    <div>
      <h1>My TO-DO List - Frontend</h1>
    </div>
  )
}
export default App