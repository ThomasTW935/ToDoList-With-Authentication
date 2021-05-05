import React, { useReducer, useState, useRef, useEffect } from 'react'
import moon from '../../images/icon-moon.svg'
import sun from '../../images/icon-sun.svg';
import bgDesktopDark from '../../images/bg-desktop-dark.jpg';
import bgDesktopLight from '../../images/bg-desktop-light.jpg';
import Todo from './Todo';
import {database} from '../../firebase'
import {useAuth} from '../../context/AuthContext'

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
const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
}

export default function Todos() {

    const [taskName,setTaskName] = useState('')
    const [taskStatus, setTaskStatus] = useState(false)
    const formRef = useRef()
    const [theme, setTheme] = useState(THEMES.LIGHT)
    const {currentUser}= useAuth()

    const [todos, dispatch] = useReducer(reducer,[
            { id: 1, task: "Run", complete: false },
            { id: 2, task: "Swim 3x", complete: true },
            { id: 3, task: "Code", complete: false },
    ])
    const [activeStatus, setActiveStatus] = useState(STATUSES[0])

    console.log(todos)

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
        formRef.current.reset()
        
    }

    
    function handleClear(){
        // dispatch({type: ACTIONS.CLEAR_TODOS, payload: {}})
    }
    function handleThemeChange(){
        setTheme( prevTheme => prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT )
    }

    function test(){}

    return (
        <div className='todos'>
            <div className={ `todos__background ${theme}-theme` }></div>
            <div className='todos__header'>
                <h1>TODO</h1>
                <button className='btn' onClick={handleThemeChange}><img src={ theme === THEMES.LIGHT ? moon : sun } /></button>
                <form ref={formRef} onSubmit={handleForm} className='todo'>
                    <label className='custom-checkbox'><input onChange={(e)=>{ setTaskStatus( prevStatus=> !prevStatus ) }} className='custom-checkbox-input' type='checkbox' /><span className='custom-checkbox-span'></span></label>
                    <input onChange={ (e)=> { setTaskName(e.target.value) } }  className='todo-task' placeholder='Create a new Todo' />
                </form>
            </div>
            <div className='todos__body'>
                { todos.map(todo=>
                    {
                        if(activeStatus === STATUSES[1] && todo.complete) return
                        if(activeStatus === STATUSES[2] && !todo.complete) return
                        return <Todo key={todo.id} todo={todo} dispatch={test} /> 
                    }
                ) }
               
            </div>
            <div className='todos__footer'>
                <div>3 items left</div>
                <section>
                    {
                        STATUSES.map((value,index) =>
                            <button key={index} onClick={ ()=>{ setActiveStatus(value) } }
                            className={value === activeStatus ? 'btn btn-status btn-status-active' : 'btn btn-status'} >{value}</button>
                        )

                    }
                </section>
                <button onClick={ handleClear }className='btn btn-status'>Clear Completed</button>
            </div>
            {currentUser.uid}
        </div>
    )
}
