import React, { useReducer, useState, useRef, useEffect } from 'react'
import Todo from './Todo';
import {database} from '../../firebase'
import {useAuth} from '../../context/AuthContext'
import ThemeChange from './ThemeChange';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  UPDATE_TODO: 'update-todo',
  DELETE_TODO: 'delete-todo',
  CLEAR_TODOS: 'clear-todos',
  SET_TODOS: 'set-todos',
  UPDATE_STATUS: 'update-status'
}


function reducer(todos, {type,payload}){
  switch(type){
    case ACTIONS.SET_TODOS: 
      return [...payload.todos]
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(payload.task, payload.complete)]
    case ACTIONS.UPDATE_TODO:
      return todos.map(todo=> {
        console.log(payload)
        if(todo.id === payload.id){
            return {...todo,  complete:!todo.complete}
        }
        return todo
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo=> todo.id !== payload.id)
    case ACTIONS.CLEAR_TODOS:
      return []
    default: return todos
  }
}

function newTodo(task,complete){
  return {id:Date.now(), task: task, complete: complete}
}

const STATUSES = ['all','active','completed']


export default function Todos() {

    const [taskName,setTaskName] = useState('')
    const [taskStatus, setTaskStatus] = useState(false)
    const formRef = useRef()
    const {currentUser}= useAuth()

    const [todos, dispatch] = useReducer(reducer,[])
    const [activeStatus, setActiveStatus] = useState(STATUSES[0])


    useEffect(()=>{ 
        return database.todos.where('userId', '==', currentUser.uid)
        .onSnapshot(querySnapshot=> {
            dispatch({
                type: ACTIONS.SET_TODOS, 
                payload: { todos: querySnapshot.docs.map(database.fortmatDoc) }
            })
        })
    },[currentUser])
    
    function handleForm(e){
        e.preventDefault()
        database.todos.add({
            task: taskName,
            complete: taskStatus,
            userId: currentUser.uid,
            createdAt: database.getCurrentTimestamp()
        })
        dispatch({type: ACTIONS.ADD_TODO, payload: {task:taskName, complete: taskStatus}})
        setTaskStatus(false)
        formRef.current.reset()
    }

    
    function handleClear(){
      todos.map(todo=>{
        database.todos.doc(todo.id).delete().then(()=>{
          console.log('Document Deleted')
        }).catch(error=>{
          console.log('Error: '+ error)
        })
      })
      dispatch({type: ACTIONS.CLEAR_TODOS, payload: {}})
    }
   

    function test(){}

    return (
        <div className='todos'>
            <div className='todos__background'></div>
            <div className='todos__header'>
                <h1>TODO</h1>
                <ThemeChange/>
            </div>
            <div className='todos__body'>
                <form ref={formRef} onSubmit={handleForm} className='todo todos__form'>
                    <label className='custom-checkbox'><input onChange={(e)=>{ setTaskStatus( prevStatus=> !prevStatus ) }} className='custom-checkbox-input' type='checkbox' /><span className='custom-checkbox-span'></span></label>
                    <input onChange={ (e)=> { setTaskName(e.target.value) } }  className='todo-task' placeholder='Create a new Todo' />
                </form>
                <div className='todos__list'>
                    { todos.map(todo=>
                        {
                            if(activeStatus === STATUSES[1] && todo.complete) return
                            if(activeStatus === STATUSES[2] && !todo.complete) return
                            return <Todo key={todo.id} todo={todo} dispatch={test} /> 
                        }
                    ) }
                
                </div>
                <div className='todos__footer'>
                    <div>{todos && todos.length} items left</div>
                    <section className='todos__status'>
                        {
                            STATUSES.map((value,index) =>
                                <button key={index} onClick={ ()=>{ setActiveStatus(value) } }
                                className={value === activeStatus ? 'btn btn-status btn-status-active' : 'btn btn-status'} >{value}</button>
                            )

                        }
                    </section>
                    <button onClick={ handleClear }className='btn btn-status'>Clear Completed</button>
                </div>
            </div>
        </div>
    )
}
