import React from 'react'
import {ACTIONS} from './Todos'

export default function Todo({todo,dispatch}) {
    function handleCheckBox(todo){
        console.log(ACTIONS)
        console.log(todo)
        dispatch({type: ACTIONS.UPDATE_TODO, payload: {id:todo.id}})
    }
    function handleDelete(todo){
        dispatch({type: ACTIONS.DELETE_TODO, payload: {id:todo.id}})
    }
    return (
        <div className='todo'>
            <label className='custom-checkbox'>
                <input onChange={()=> handleCheckBox(todo)} checked={todo.complete} className='custom-checkbox-input' type='checkbox' />
                <span className='custom-checkbox-span'></span>
            </label>
            <p className={todo.complete ? 'todo-task todo-completed':'todo-task'}>{todo.task}</p>
            <button onClick={ ()=> handleDelete(todo) }className='btn btn-warning btn-trash'></button>
        </div>
    )
}
