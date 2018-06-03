import React, { Component } from 'react';
import './App.css';
import todoList from './todos.json';
 
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: todoList, text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (  
      <div class="todoapp">
        {console.log(this.state.todos)}
        <h3>TODO</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo" className="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.todos.length + 1}
          </button>
        </form>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      title: this.state.text,
      completed:false,
      id: Date.now()
    };

    this.setState(prevState => ({
      todos: prevState.todos.concat(newItem),
      
      text: ''

    }));
  }
}

class TodoList extends React.Component {

  handleChange({target}){
    if (target.checked){
       target.removeAttribute('checked');
       target.parentNode.style.textDecoration = "line-through";
    } else {
       target.setAttribute('checked', true);
       target.parentNode.style.textDecoration = "";
    }
}

// deleteTodo(id){
//   const newTodoList = todoList.filter(function(el) {
//     return el.id !== id;
// });
// this.setState({
//   todos: newTodoList,
//   text: ''

// });
// }
  render() {
    return (
      <ul className="todo-list" >
        {this.props.todos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <input type="checkbox" onClick={this.handleChange} checked/>:<input type="checkbox" onClick={this.handleChange}/>}
            {todo.title}
            <button className="close" >x</button>
          </li>
        ))}
      </ul>
    );
  }
}

export default TodoApp;
