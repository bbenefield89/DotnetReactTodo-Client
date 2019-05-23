import React from 'react';
import { Route } from 'react-router-dom'

import { GlobalProvider, TodoItemEdit, TodoList } from './components/index'

import './App.css';

const App: React.FC = (props: any): JSX.Element => {
  return (
    <div className="App">
      <GlobalProvider>
        <Route exact path='/' component={TodoList} />
      </GlobalProvider>
        <Route path='/:id' component={TodoItemEdit} />
      </div>
  );
}

export default App;
