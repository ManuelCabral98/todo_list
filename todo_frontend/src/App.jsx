import { useState,useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodoTitle, setNewTodoTitle] = useState("")

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/todos").then(response => response.json()).then(data => {
      console.log("Datos recibidos de Rails: ", data)
      setTodos(data)
    })
    .catch(error => console.error("Error conectando con Rails:", error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTodoTitle.trim() === "") return

    const bodyData ={
      todo: {
        title: newTodoTitle,
        completed: false
      }
    }

    fetch("http://localhost:3000/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(newTodoCreated => { 
      setTodos([...todos, newTodoCreated]) 
      setNewTodoTitle("")
    })
    .catch(error => console.error("Error creating task: ", error))
  }

  return (
    <div>
      <h1>My TO-DO List - Frontend</h1>
    </div>
  )
}
export default App