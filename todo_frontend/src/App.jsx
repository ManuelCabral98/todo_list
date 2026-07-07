import { useState,useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [categories, setCategories] = useState([])
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  // fetch data from rails API 
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/todos`).then(response => response.json()).then(data => {
      console.log("Datos recibidos de Rails: ", data)
      setTodos(data)
    })
    .catch(error => console.error("Error fetching todos from Rails:", error))
  }, [])

  // fetch categories
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
    .then(rawCategories => rawCategories.json())
    .then(categoriesData => {
      setCategories(categoriesData)
    })
    .catch(error => console.error("Error fetching categories from Rails:", error))
  }, []) // ensure running this useEffect just once

  // handle new todo submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTodoTitle.trim() === "") return

    const bodyData ={
      todo: {
        title: newTodoTitle,
        completed: false,
        category_id: selectedCategory
      }
    }

    fetch(`${import.meta.env.VITE_API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(response => {
      // Si la respuesta NO es exitosa (ej: 422, 500, 400)
      if (!response.ok) {
        // Lanzamos el JSON de error hacia el .catch()
        return response.json().then(err => { throw err });
      }
      return response.json();
    })
    .then(newTodoCreated => { 
      setTodos([...todos, newTodoCreated]) 
      setNewTodoTitle("")
    })
    .catch(error => console.error("Error creating task: ", error))
  }

  // handle click on checkbox
  const handleToggle = (e, todo) => {
    e.preventDefault()

    const toggleValue = {
      todo: {
        completed: !todo.completed
      }
    }

    fetch(`${import.meta.env.VITE_API_URL}/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(toggleValue)
    })
    .then(response => response.json())
    .then(checkboxUpdate => {
      setTodos(todos.map(t => t.id === checkboxUpdate.id ? checkboxUpdate : t))
    })
    .catch(error => console.error("Error updating checkbox value: ", error))
  }

  //handle delete action
  const handleDelete = (e, todo) => {
    e.preventDefault()

    fetch(`${import.meta.env.VITE_API_URL}/todos/${todo.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(deletedTodo => {
      setTodos(todos.filter(t => t.id !== deletedTodo.id))
    })
    .catch(error => console.error("Error deleting value: ", error))
  }

  // UI styles
  const styles = {
    appContainer: {
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#334155'
    },
    card: {
      backgroundColor: '#ffffff',
      width: '100%',
      maxWidth: '480px',
      borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      padding: '32px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '6px',
      color: '#0f172a'
    },
    subtitle: {
      fontSize: '14px',
      color: '#64748b',
      marginBottom: '24px'
    },
    form: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px'
    },
    input: {
      flex: 1,
      padding: '12px 16px',
      fontSize: '15px',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      outline: 'none',
      backgroundColor: '#f1f5f9',
      transition: 'all 0.2s ease',
      color: '#000000',
    },
    button: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
      padding: '12px 20px',
      fontSize: '15px',
      fontWeight: '600',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    todoList: {
      listStyleType: 'none',
      padding: 0,
      margin: 0
    },
    todoItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '14px 16px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      marginBottom: '10px',
      border: '1px solid #e2e8f0',
      justifyContent: 'space-between'
    },
    todoItemLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    todoItemRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    deleteButton: {
      background: 'red',
      borderRadius: '25%',
      borderColor: 'red',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      opacity: 0.7,
    },
    checkbox: {
      width: '18px',
      height: '18px',
      cursor: 'pointer',
      accentColor: '#2563eb'
    },
    todoText: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#334155'
    },
    badge: {
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: '#e0f2fe',
      color: '#0369a1',
      padding: '4px 8px',
      borderRadius: '6px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }
  }

  return (
    <div style={styles.appContainer}>
      <main style={styles.card}>
        <header>
          <h1 style={styles.title}>Task Manager</h1>
          <p style={styles.subtitle}>FullStack Project (React and Rails)</p>
        </header>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="write a new task..."
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            style={styles.input}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button type="submit" style={styles.button}>Add Task</button>
        </form>
        <section>
            {todos.length === 0 ? (
              <p style={{textAlign: 'center', color: '#94a3b8'}}>No tasks found.</p>
            ) : (
              <ul style={styles.todoList}>
                {todos.map (todo => (
                  <li key={todo.id} style={styles.todoItem}>
                    
                    {/* left container: checkbox + title */}
                    <div style={styles.todoItemLeft}>
                      <input 
                        type='checkbox'
                        checked={todo.completed}
                        onChange={(e) => handleToggle(e, todo)}
                        style={styles.checkbox}
                      />
                      <span style={styles.todoText}>{todo.title}</span>
                    </div>

                    {/* right container: category badge + delete button*/}
                    <div style={styles.todoItemRight}>
                      {todo.category && (
                        <span style={styles.badge}>
                          {todo.category.name}
                        </span>
                      )}
                      <button onClick={(e) => handleDelete(e, todo)} style={styles.deleteButton}> X </button>
                    </div>

                  </li>
                ))}
              </ul>
            )}
          </section>
      </main>
    </div>
  )
}
export default App