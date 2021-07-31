import React, { Component } from 'react';
import Todos from './Todos'
class App extends Component {
  state = {
    todos: [
      { id: 1, content: 'buy some milk', Incomplete: true },
      { id: 2, content: "play mario kart", Incomplete: true }
    ],
    status:'All',
    selectedTodo:{id:0, content:'',actionLabel:'Add new todo'}
    
  }
  changeStatus=(v)=>{
    this.setState({
      ...this.state,
      status:v
    })
  }
  clearCompleted=()=>{
    const todos=this.state.todos.filter(todo=>{
      return todo.Incomplete!==false
    });
    this.setState({
      ...this.state,
      todos:todos
    })
  }
  deleteTodo=(id)=>{
    const todos=this.state.todos.filter(todo=>{
      return todo.id!==id
    });
    let selectedTodo=this.state.selectedTodo.id===id?
    {id:0, content:'',actionLabel:'Add new todo'}:this.state.selectedTodo
    this.setState({
      ...this.state,
      todos:todos,
      selectedTodo:selectedTodo
    })
  }
  completeTodo = (id) => {
    const todos = this.state.todos.map(item => {
      var temp = Object.assign({}, item);
      if (temp.id === id) {
        temp.Incomplete = false;
      }
      return temp;
    });
    let selectedTodo=this.state.selectedTodo.id===id?
    {id:0, content:'',actionLabel:'Add new todo'}:this.state.selectedTodo
    this.setState({
      ...this.state,
      todos:todos,
      selectedTodo:selectedTodo
    })
  }
  addTodo = (todo) => {
    if(todo.id===0){
      todo.id = Math.random();
      todo.Incomplete = true;
      let todos = [...this.state.todos, todo]
      const initSelectedTodo={id:0, content:'',actionLabel:'Add new todo'};
      this.setState({
        ...this.state,
        todos: todos,
        selectedTodo:initSelectedTodo

      });
    }
     else{
      const todos = this.state.todos.map(item => {
        var temp = Object.assign({}, item);
        if (temp.id === todo.id) {
          temp.content = todo.content;
        }
        return temp;
      });
      const initSelectedTodo={id:0, content:'',actionLabel:'Add new todo'};
      this.setState({
        ...this.state,
        todos:todos,
        selectedTodo:initSelectedTodo
      })
     }
    
  }
  changeTodo=(todo)=>{
    todo.actionLabel='Update todo'
      this.setState({
        ...this.state,
        selectedTodo: todo
    })
  }
  handleChange = (e) => {
    const selectedTodo={...this.state.selectedTodo, content:e.target.value}
        this.setState({
            ...this.state,
            selectedTodo: selectedTodo
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var todo=this.state.selectedTodo;
        this.addTodo(todo);
    }
  render() {
    return (
      <div className="todo-app container">
        <h1 className="center blue-text">Todo's</h1>
        <Todos state={this.state} 
        changeStatus={this.changeStatus} 
        completeTodo={this.completeTodo} 
        clearCompleted={this.clearCompleted}
        deleteTodo={this.deleteTodo}
        changeTodo={this.changeTodo}
        />
         <div>
              <form onSubmit={this.handleSubmit}>
                  <label>{this.state.selectedTodo.actionLabel}:</label>
                  <input type="text" onChange={this.handleChange} value={this.state.selectedTodo.content} placeholder="Type and press enter"/>
              </form>
          </div>
      </div>
    );
  }

}

export default App;
