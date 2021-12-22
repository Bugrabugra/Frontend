import React from 'react'
import ReactDOM from 'react-dom'


const withKeyFromProps = (Comp, propName) => (props) => <Comp key={props[propName]} {...props} />;

const TodoItem = (todo) => {
  return (
    <li>
      <input type="checkbox" defaultChecked={todo.isComplete} />
      {todo.name}
    </li>
  )
};

const TodoDisplay = withKeyFromProps(TodoItem, "id");

class App extends React.Component {
  render() {
    return (
      <div>
        <ul>{this.props.todos.map(TodoDisplay)}</ul>
      </div>
    );
  }
};

const todos = [
  {id: 1, name: 'Create the initial state', isComplete: true},
  {id: 2, name: 'Map over data', isComplete: true},
  {id: 3, name: 'Refactor', isComplete: false},
  {id: 4, name: 'Use HOC to remove warning', isComplete: false},
];

ReactDOM.render(<App todos={todos}/>, document.getElementById("root"));