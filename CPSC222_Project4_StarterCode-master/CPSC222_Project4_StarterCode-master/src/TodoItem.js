import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
	getStyle = () => {
		return {
			backgroundColor: '#000000',
			padding: '6px',
			borderBottom: '1px #ccc solid',
			textDecoration: this.props.item.completed ? 'line-through' : 'none'
		}
	}

	markComplete = (event) => {
		console.log(this.props);
	}

	render() {
		const { id, title } = this.props.item;
		return (
			<div style={this.getStyle()}>
				<p>
					<input type="checkbox" onChange={this.props.markComplete.bind(this, id)}/> {' '}
					{ title }
					<button style={buttonStyle} onClick={this.props.deleteitem.bind(this, id)}>
						{'DELETE'}
					</button>
				</p>
			</div>
		);
	}
}

const buttonStyle = {
	float: 'right',
	backgroundColor: 'red',
	border: '2px solid black'
}


TodoItem.propTypes = {
	item: PropTypes.object.isRequired
}

export default TodoItem;