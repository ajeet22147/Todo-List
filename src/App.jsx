import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import { v4 as uuidv4 } from 'uuid'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  // Get todos from LocalStorage when app loads
  useEffect(() => {
    const todoString = localStorage.getItem("todos")

    if (todoString) {
      setTodos(JSON.parse(todoString))
    }
  }, [])

  // Save todos to LocalStorage whenever todos changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  // Show / Hide finished todos
  const toggleFinished = () => {
    setshowFinished(prev => !prev)
  }


  // Edit todo
  const handleEdit = (e, id) => {
    const selectedTodo = todos.find(item => item.id === id)

    if (selectedTodo) {
      setTodo(selectedTodo.todo)
    }

    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }


  // Delete todo
  const handleDelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }


  // Add todo
  const handleAdd = () => {

    if (todo.trim().length <= 3) {
      return
    }

    const newTodo = {
      id: uuidv4(),
      todo: todo,
      isCompleted: false
    }

    setTodos([...todos, newTodo])
    setTodo("")
  }


  // Input change
  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  // Checkbox
  const handleCheckbox = (e) => {

    const id = e.target.name

    const newTodos = todos.map(item => {

      if (item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted
        }
      }

      return item
    })

    setTodos(newTodos)
  }


  return (
    <>
      <Navbar />

      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">

        <h1 className="font-bold text-center text-3xl">
          iTask - Manage your todos at one place
        </h1>


        {/* Add Todo */}
        <div className="addTodo my-5 flex flex-col gap-4">

          <h2 className="text-2xl font-bold">
            Add a Todo
          </h2>

          <div className="flex">

            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-full px-5 bg-white"
            />

            <button
              onClick={handleAdd}
              disabled={todo.trim().length <= 3}
              className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white"
            >
              Save
            </button>

          </div>

        </div>


        {/* Show Finished */}
        <input
          className="my-4"
          id="show"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />

        <label
          className="mx-2"
          htmlFor="show"
        >
          Show Finished
        </label>


        <div className="h-[1 px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>


        {/* Todos Heading */}
        <h2 className="text-2xl font-bold">
          Your Todos
        </h2>


        {/* Todos */}
        <div className="todos">

          {todos.length === 0 && (
            <div className="m-5">
              No Todos to display
            </div>
          )}


          {todos.map(item => {

            return (
              (showFinished || !item.isCompleted) &&

              <div
                key={item.id}
                className="todo flex my-3 justify-between"
              >

                <div className="flex gap-5">

                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />

                  <div
                    className={item.isCompleted ? "line-through" : ""}
                  >
                    {item.todo}
                  </div>

                </div>


                {/* Buttons */}
                <div className="buttons flex h-full">

                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <FaEdit />
                  </button>


                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <AiFillDelete />
                  </button>

                </div>

              </div>
            )
          })}

        </div>

      </div>
    </>
  )
}

export default App 