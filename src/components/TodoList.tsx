import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Store } from './GlobalProvider'

type Props = {}

type State = {
  [key: string]: any
  todoList: object[]
  todo_title: string
}

class TodoList extends Component<Props, State> {

  state: State = {
    todoList: [],
    todo_title: ''
  }

  render() {
    return (
      <Store.Consumer>
        {(context: any): JSX.Element => {
          console.log(context)
          return (
            <React.Fragment>
              <h1>Dotnet React TodoList</h1>

              <form onSubmit={e => e.preventDefault()}>
                <label htmlFor='todo_title'>Todo Title</label>
                <input
                  name='todo_title'
                  onChange={this.todoTitleOnChange.bind(this)}
                  type='text'
                  value={this.state.todo_title}
                />
                <input
                  // onClick={context.createTodo.bind(context, this.state.todo_title)}
                  onClick={() => context.createTodo(this.state.todo_title)}
                  type='submit'
                  value='Submit'
                />
              </form>

              <ul>
                {this.state.todoList.map((item: object | any): JSX.Element => {
                  return (
                    <li key={item.id}>
                      <ul>
                        <li>{item.id}</li>
                        <li>{item.title}</li>
                        <li>{item.is_complete}</li>

                        <li>
                          <Link to={`/${item.id}`}>
                            Edit Todo
                          </Link>
                        </li>

                        <li>
                          <button
                            onClick={this.deleteTodo.bind(this, item.id, item)}
                          >
                            Delete Todo
                          </button>
                        </li>
                      </ul>
                    </li>
                  )
                })}
              </ul>
            </React.Fragment>
          )
        }}
      </Store.Consumer>
    )
  }

  componentDidMount() {
    fetch('todo')
      .then(res => res.json())
      .then(todos => this.setState({ todoList: [...todos] }))
      .catch(err => console.log(err))
  }

  todoTitleOnChange(event: any): void {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  deleteTodo(id: number, todo: object): void {
    fetch(`todo/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    })
      .then(res => res.json())
      .then(json => {
        const todoList: object[] = this.state.todoList.filter((todoItem: any) => todoItem.id !== id)
        this.setState({ todoList })
      })
      .catch(err => console.log(err))
  }

}

export { TodoList }