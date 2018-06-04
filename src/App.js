import React, { Component } from 'react';
import './App.css';
import todoList from './todos.json';
 
class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: todoList, text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (  
      <div className="todoapp">
			<header className="header">
				<h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
	      <input
            id="new-todo" className="new-todo" placeholder="What needs to be done?" autoFocus
            onChange={this.handleChange}
            value={this.state.text}
          />
        </form>  
			</header>
      <TodoList todos={this.state.todos} />
			<footer className="footer">
				<span className="todo-count"><strong>{this.state.todos.length}</strong> item(s) left</span>
				<button className="clear-completed">Clear completed</button>
			</footer>
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

class TodoList extends Component {

  

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
				
      <div className="main">
      <ul className="todo-list" >
        {this.props.todos.map(todo => (
          <TodoItem completed={todo.completed} title={todo.title} id= {todo.id} ></TodoItem> 
        ))}
      </ul>
      </div>
    );
  }
}

class TodoItem extends Component{
  handleChange({target}){
    if (target.checked){
       target.setAttribute("checked",false);
       target.parentNode.className="";
    } else {
       target.setAttribute('checked', true);
       target.parentNode.className="completed";
    }
  }

  render(){
    return(
      <React.Fragment>
          <li className={this.props.completed? "completed":""}>
                <div className="view">
                <input id={this.props.id}className="toggle" type="checkbox" onChange={this.handleChange} checked={this.props.completed}/>
                <label>{this.props.title}</label>
                <button className="destroy"></button>
              </div>
            </li>
      </React.Fragment>
    );
  }
}
export default TodoApp;
