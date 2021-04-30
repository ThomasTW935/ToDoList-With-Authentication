import React, { useReducer, useState } from 'react'

function reducer(todos, {type, payload}){

}

const ACTIONS = {}
const STATUSES = ['all','active','completed']

export default function Todos() {

    const [todos, dispatch] = useReducer(reducer, 
        [
            { id: 1, todo: "Run", isCompleted: false },
            { id: 2, todo: "Swim", isCompleted: true },
            { id: 3, todo: "Code", isCompleted: false },
    ])
    const [activeStatus, setActiveStatus] = useState(STATUSES[0])

    return (
        <div className='todos'>
            <div className='todos__header'>
                <h1>TODO</h1>
                <button>Moon</button>
                <div className='todo'>
                    <label className='custom-checkbox'><input className='custome-checkbox-input' type='checkbox' /><span className='custome-checkbox-span'></span></label>
                    <input placeholder='Create a new Todo' />
                </div>
            </div>
            <div className='todos__body'>
                { todos.map(todo=>
                    <div className='todo'>
                       <label className='custom-checkbox'><input checked={todo.isCompleted} className='custome-checkbox-input' type='checkbox' /><span className='custome-checkbox-span'></span>s</label>
                        <p>{todo.todo}</p>
                        <button className='btn btn-warning'>Del</button>
                    </div>  
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
                <button className='btn'>Clear Completed</button>
            </div>
        </div>
    )
}
