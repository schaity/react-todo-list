import React from 'react'

const getTodoItems=(state)=>{
    switch (state.status) {
        case 'All':
          return state.todos;
        case 'Incomplete':
          return state.todos.filter(todo=>{
            return todo.Incomplete!==false
          });
        case 'Completed':
            return state.todos.filter(todo=>{
                return todo.Incomplete!==true
              });
        default:
          return null;
      }
}

const getList=(state,completeTodo,deleteTodo,changeTodo)=>{
    const todos=getTodoItems(state);
    return(
        todos.length ? (
            todos.map(todo => {
                return (
                    todo.Incomplete ? (
                        <div className="collection-item" key={todo.id}>
                            <input type="checkbox" onClick={() => { completeTodo(todo.id) }}/>
                            <span onClick={() => { completeTodo(todo.id) }}>
                            {todo.content} </span>
                           
                             <span onClick={() => { deleteTodo(todo.id) }} className="secondary-content" style={{cursor:'pointer'}}>
                             <i className="material-icons">close</i></span> 

                             <span onClick={() => { changeTodo(todo) }} className="secondary-content" style={{cursor:'pointer'}}>
                             <i className="material-icons">create</i></span> 
                           
                        </div>
                    ) :
                        (
                            <div className="collection-item" key={todo.id}>
                             <input type="checkbox" checked="checked" disabled="disabled"/>
                                <span style={{ textDecoration: 'line-through' }}>
                                    {todo.content} </span>
                             <span onClick={() => { deleteTodo(todo.id) }} className="secondary-content" style={{cursor:'pointer'}}>
                             <i className="material-icons">close</i></span> 
                           
                            </div>
                        )
                )
            }
            )
        ) : (<p className="center">No todo's left!</p>)
    )
    
}

const Todos = ({ state,changeStatus, completeTodo,clearCompleted ,deleteTodo, changeTodo}) => {
    const todoList=getList(state,completeTodo,deleteTodo,changeTodo);
    return (
        <div>
            <div className="todos collection with-header">
                <div className='collection-header'><h5>{state.status} items</h5></div>
                {todoList}
            </div>
            <div className="center">
                <span><input className="btn btn-primary" type="button" value="All" onClick={() => { changeStatus('All') }} /></span>
                <span> <input className="btn btn-primary" type="button" value="Incomplete" onClick={() => { changeStatus('Incomplete') }} /></span>
                <span> <input className="btn btn-primary" type="button" value="Completed" onClick={() => { changeStatus('Completed') }} /></span>
                <span> <input className="btn btn-danger" type="button" value="Clear Completed" onClick={clearCompleted} /></span>               
            </div>
        </div>
    )
}

export default Todos