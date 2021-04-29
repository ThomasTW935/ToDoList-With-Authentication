import React, { useReducer } from 'react'

function reducer(todos, {type, payload}){

}

export default function Todos() {

    const [todos, dispatch] = useReducer(reducer, 
        [
            { id: 1, todo: "Run", isCompleted: false },
            { id: 2, todo: "Swim", isCompleted: true },
            { id: 3, todo: "Code", isCompleted: false },
    ])

    return (
        <div className='todos'>
            <div className='todos__header'>
                <h1>TODO</h1>
                <button>Moon</button>
            </div>
            <div className='todos__body'>
                <div className='todo'>
                    <label><input type='checkbox' /></label>
                    <p>Tteesfsdfsd</p>
                    <button>Del</button>
                </div>
                { todos.map(todo=>
                    <div className='todo'>
                        <label><input type='checkbox' checked={todo.isCompleted} /></label>
                        <p>{todo.todo}</p>
                        <button>Del</button>
                    </div>  
                ) }
            </div>
            <div className='todos__footer'>
                <div>3 items left</div>
                <section>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </section>
                <button>Clear Completed</button>
            </div>
        </div>
    )
}
