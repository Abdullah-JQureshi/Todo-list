import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let TodoString = localStorage.getItem("Todos")
    if(TodoString){
      let Todos = JSON.parse(localStorage.getItem("Todos"))
      setTodos(Todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }
  
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  

  const handleEdit = (e, id)=>{
    let T = Todos.filter(i=>i.id === id)
   setTodo(T[0].Todo)
   let newTodos= Todos.filter(item=>{
    return item.id!==id
  });
  setTodos(newTodos)
  saveToLS()
  }
 
  const handleDelete = (e, id)=>{
    let newTodos= Todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = ()=>{
    setTodos([...Todos, {id: uuidv4(), Todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos= [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }
  
 
  return (
    <>
    <Navbar/>
    <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-green-500 min-h-[80vh] md:w-1/2">
    <h1 className='font-bold text-center text-xl'>AJ list - Where you manage,save and update your tasks</h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className='text-lg font-bold'>Add Todo</h2>
        <input onChange={handleChange} value={Todo} type="text" className='w-full rounded-full px-5 py-1' />
        <button onClick={handleAdd} disabled={Todo.length<=3} className='bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-800 p-2 py-1 text-sm font-bold text-black rounded-md'>Save</button>
      </div>
      <input className='my-4' onChange={toggleFinished} type="Checkbox" checked={showFinished} /> Show Finished
         <h2 className='font-bold text-lg'>My Todo-list</h2>
         <div className="Todos">
          {Todos.length ===0 && <div className='m-5'>No Todos to display</div>}
          {Todos.map(item=>{

          return (showFinished || !item.isCompleted) && <div key={item.id} className="Todo flex md:w-1/2 my-3 justify-between">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.Todo}</div>
            </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-yellow-500 hover:bg-yellow-400 p-2 py-1 text-sm font-bold text-black rounded-md mx-1'><MdModeEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-yellow-500 hover:bg-yellow-400 p-2 py-1 text-sm font-bold text-black rounded-md mx-1'><MdDelete /> </button>
            </div>
          </div>
            })}
         </div>
    </div>
    </>
  )
}

export default App
