import React, { Component } from 'react'

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
            onClick={this.createTodo.bind(this)}
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
                  <li>{item.name}</li>
                  <li>{item.is_complete}</li>
                </ul>
              </li>
            )
          })}
        </ul>
      </React.Fragment>
    )
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/todo')
      .then(res => res.json())
      .then(todos => this.setState({ todoList: [...todos] }))
      .catch(err => console.log(err))
  }

  todoTitleOnChange(event: any): void {
    console.log(event.target.name)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  createTodo(): void {
    console.log({ title: [this.state.todo_title], is_complete: 'false' })
    
    fetch('todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: [this.state.todo_title], is_complete: 'false' })
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err))
  }

}

export { TodoList }