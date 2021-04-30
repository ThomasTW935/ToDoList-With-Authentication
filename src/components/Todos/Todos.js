import React, { useReducer, useState } from 'react'

const ACTIONS = {
    ADD_TODO: 'add-todo',
    UPDATE_TODO: 'update-todo',
    DELETE_TODO: 'delete-todo',
    UPDATE_STATUS: 'update-status'
}


function reducer(todos, {type,payload}){
    console.log(type)
    switch(type){
        case ACTIONS.UPDATE_TODO:
            return todos.map(todo=> {
                console.log(payload)
                if(todo.id === payload.id){
                    return {...todo,  complete:!todo.complete}
                }
                return todo
            })
        default: return todos
    }
}


const STATUSES = ['all','active','completed']

export default function Todos() {

    const [todos, dispatch] = useReducer(reducer, 
        [
            { id: 1, todo: "Run", complete: false },
            { id: 2, todo: "Swim 3x", complete: true },
            { id: 3, todo: "Code", complete: false },
    ])
    const [activeStatus, setActiveStatus] = useState(STATUSES[0])


    function handleCheckBox(todo){
        dispatch({type: ACTIONS.UPDATE_TODO, payload: {id:todo.id}})
    }

    return (
        <div className='todos'>
            <div className='todos__header'>
                <h1>TODO</h1>
                <button>Moon</button>
                <div className='todo'>
                    <label className='custom-checkbox'><input className='custom-checkbox-input' type='checkbox' /><span className='custom-checkbox-span'></span></label>
                    <input placeholder='Create a new Todo' />
                </div>
            </div>
            <div className='todos__body'>
                { todos.map(todo=>
                    {
                        if(activeStatus === STATUSES[1] && todo.complete) return
                        if(activeStatus === STATUSES[2] && !todo.complete) return
                        return <div key={todo.id} className='todo'>
                            <label className='custom-checkbox'>
                               <input onChange={()=> handleCheckBox(todo)} checked={todo.complete} className='custom-checkbox-input' type='checkbox' />
                               <span className='custom-checkbox-span'></span>
                            </label>
                            <p className={todo.complete ? 'todo-task todo-completed':'todo-task'}>{todo.todo}</p>
                            <button className='btn btn-warning'>Del</button>
                        </div>
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
                <button className='btn btn-status'>Clear Completed</button>
            </div>
        </div>
    )
}
