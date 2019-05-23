import React, { Component } from 'react'

type Props = {}

type State = {
  todoList: object[]
}

type TodoItem = {
  id: number
  name: string
  is_complete: string
}

class TodoList extends Component<Props, State> {

  state: State = {
    todoList: []
  }

  render() {
    return (
      <React.Fragment>
        <h1>Dotnet React TodoList</h1>

        <ul>
          {this.state.todoList.map((item: any) => {
            return (
              <li key={item.id}>
                <p>{item.id}</p>
                <p>{item.name}</p>
                <p>{item.is_complete}</p>
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

}

export { TodoList }