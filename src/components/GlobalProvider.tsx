import React, { createContext, Component } from 'react'

const Store = createContext({})

class GlobalProvider extends Component {

  state = {
    name: 'Brandon',
    todoList: []
  }

  render() {
    return (
      <Store.Provider
        value={{
          state: this.state,
          getName: this.getName,
          createTodo: this.createTodo.bind(this),
          getTodoList: this.getTodoList
        }}
      >
        {this.props.children}
      </Store.Provider>
    )
  }

  getName() {
    return this.state.name
  }

  createTodo(todoTitle: string): void {
    fetch('todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: todoTitle, is_complete: 'false' })
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ todoList: [...this.state.todoList, json] }, () => console.log(this.state.todoList))
      })
      .catch(err => console.log(err))
  }

  getTodoList() {
    fetch('todo')
      .then(res => res.json())
      .then(json => this.setState({ todoList: json }))
  }

}

export { GlobalProvider, Store }