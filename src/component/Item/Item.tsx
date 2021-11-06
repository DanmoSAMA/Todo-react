import React from 'react'
import styles from './Item.module.scss'

interface Todo {
	title: string
	id: string
	done: boolean
	isShown: boolean
}

interface Props {
	todo: Todo
	delTodo: (id: string) => void
	toggle: (id: string) => void
}

class Item extends React.Component<Props> {
	render() {
		// suppressContentEditableWarning 可以避免使用 contentEditable 时 React 警告
		return (
			<li
        className={
          this.props.todo.isShown === false
            ? `${styles.item} ${styles.hidden}`
            : styles.item
        }
			>
				<input
					type="checkbox"
					className={styles.toggle}
					defaultChecked={this.props.todo.done}
					onClick={() => {
						this.props.toggle(this.props.todo.id)
					}}
				/>
				<span contentEditable={true} suppressContentEditableWarning={true}>
					{this.props.todo.title}
				</span>
				<div
					className={styles['delete-btn']}
					onClick={() => {
						this.props.delTodo(this.props.todo.id)
					}}
				>
					×
				</div>
			</li>
		)
	}
}

export default Item
