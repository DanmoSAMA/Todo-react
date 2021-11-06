import React from 'react'
import styles from './List.module.scss'
import Item from '../Item/Item'
import Footer from '../Footer/Footer'
import { nanoid } from 'nanoid'

enum FooterMode {
	all,
	active,
	completed,
}

interface Todo {
	title: string
	id: string
	done: boolean
	isShown: boolean
}

interface Props {
	todos: Todo[]
	todoNum: number
	footerInfo: string
	footerMode: FooterMode
	delTodo: (id: string) => void
	toggle: (id: string) => void
	changeMode: (footerMode: FooterMode) => void
  clearCompleted: () => void
}

class List extends React.Component<Props> {
	render() {
		return (
			<ul id={styles.main}>
				{this.props.todos.map(todo => (
					<Item
						key={nanoid()}
						todo={todo}
						delTodo={this.props.delTodo}
						toggle={this.props.toggle}
					/>
				))}
				<Footer
          todoTotalNum={this.props.todos.length}
					todoNum={this.props.todoNum}
					footerInfo={this.props.footerInfo}
					footerMode={this.props.footerMode}
					changeMode={this.props.changeMode}
          clearCompleted={this.props.clearCompleted}
				/>
			</ul>
		)
	}
}

export default List
