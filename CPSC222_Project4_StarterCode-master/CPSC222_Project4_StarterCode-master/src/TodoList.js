import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
	render() {
			return this.props.todos.map((todo) => (
					<TodoItem key={todo.id} item={todo} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem}/>
				));		
	}
}

TodoList.propTypes = {
	todos: PropTypes.array.isRequired
}

export default TodoList;