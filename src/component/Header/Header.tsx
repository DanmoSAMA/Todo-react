import React from 'react'
import styles from './Header.module.scss'

interface Props {
	headerArrowIsSelected: boolean
	addTodo: (todoTitle: string) => void
	toggleAll: () => void
}

class Header extends React.Component<Props> {
	constructor(props: Props) {
		super(props)
		this.handleAddTodo = this.handleAddTodo.bind(this)
	}
	handleAddTodo(event: any) {
		if (event.key === 'Enter') {
			this.props.addTodo(event.target.value)
			event.target.value = ''
		}
	}
	render() {
		return (
			<div id={styles.header}>
				<span
					id={styles.arrow}
					className={
						this.props.headerArrowIsSelected === true ? styles.selected : ''
					}
					onClick={() => {
						this.props.toggleAll()
					}}
				>
					∨
				</span>
				<input
					type="text"
					placeholder="What needs to be done?"
					id={styles.input}
					minLength={1}
					maxLength={300}
					onKeyPress={this.handleAddTodo}
				/>
			</div>
		)
	}
}

export default Header
