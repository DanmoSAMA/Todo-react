import React from 'react'
import styles from './App.module.scss'
import Header from '../Header/Header'
import List from '../List/List'
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

interface Props {}

interface State {
	todos: Todo[]
	todoNum: number
	headerArrowIsSelected: boolean
	footerInfo: string
	footerMode: FooterMode
}

class App extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		const todos = [
			{ title: '吃饭', id: nanoid(), done: false, isShown: true },
			{ title: '编程', id: nanoid(), done: false, isShown: true },
			{ title: '睡觉', id: nanoid(), done: true, isShown: true },
		]
		let todoNum = 0
		for (let i = 0; i < todos.length; i++) {
			if (!todos[i].done) todoNum++
		}
		let footerInfo = 'items'
		let headerArrowIsSelected = true
		for (let i = 0; i < todos.length; i++) {
			if (!todos[i].done) {
				headerArrowIsSelected = false
				break
			}
		}
		let footerMode = FooterMode.all
		this.state = {
			todos,
			todoNum,
			footerInfo,
			headerArrowIsSelected,
			footerMode,
		}
		// 每个方法都需要绑定一次
		this.addTodo = this.addTodo.bind(this)
		this.delTodo = this.delTodo.bind(this)
		this.toggle = this.toggle.bind(this)
		this.toggleAll = this.toggleAll.bind(this)
		this.changeMode = this.changeMode.bind(this)
		this.clearCompleted = this.clearCompleted.bind(this)
	}
	// 新增 todo
	addTodo(todoTitle: string) {
		const newTodos = this.state.todos
		const todo = {
			title: todoTitle,
			id: nanoid(),
			done: false,
			isShown: true,
		}
		const footerMode = this.state.footerMode
		if (footerMode === FooterMode.completed) todo.isShown = false
		newTodos.push(todo)
		let todoNum = 0
		for (let i = 0; i < newTodos.length; i++) {
			if (!newTodos[i].done) todoNum++
		}
		let footerInfo = 'items'
		if (todoNum === 1) footerInfo = 'item'
		const headerArrowIsSelected = false
		this.setState({
			todos: newTodos,
			todoNum,
			footerInfo,
			headerArrowIsSelected,
		})
	}
	// 删除 todo
	delTodo(id: string) {
		const todos = this.state.todos
		const newTodos = todos.filter(todo => todo.id !== id)
		let todoNum = 0
		for (let i = 0; i < newTodos.length; i++) {
			if (!newTodos[i].done) todoNum++
		}
		let footerInfo = 'items'
		if (todoNum === 1) footerInfo = 'item'
		let headerArrowIsSelected = true
		for (let i = 0; i < newTodos.length; i++) {
			if (!newTodos[i].done) {
				headerArrowIsSelected = false
				break
			}
		}
		this.setState({
			todos: newTodos,
			todoNum,
			footerInfo,
			headerArrowIsSelected,
		})
	}
	// 勾选 checkbox
	toggle(id: string) {
		const newTodos = this.state.todos
		for (let i = 0; i < newTodos.length; i++) {
			if (newTodos[i].id === id) {
				newTodos[i].done = !newTodos[i].done
				if (this.state.footerMode !== FooterMode.all) {
					newTodos[i].isShown = false
				}
				break
			}
		}
		let todoNum = 0
		for (let i = 0; i < newTodos.length; i++) {
			if (!newTodos[i].done) todoNum++
		}
		let footerInfo = 'items'
		if (todoNum === 1) footerInfo = 'item'
		let headerArrowIsSelected = true
		for (let i = 0; i < newTodos.length; i++) {
			if (!newTodos[i].done) {
				headerArrowIsSelected = false
				break
			}
		}
		this.setState({
			todos: newTodos,
			todoNum,
			footerInfo,
			headerArrowIsSelected,
		})
	}
	toggleAll() {
		let allFin = true
		const todos = this.state.todos
		let newTodos = todos
		let todoNum = this.state.todoNum
		let headerArrowIsSelected = true
		for (let i = 0; i < todos.length; i++) {
			if (!todos[i].done) {
				allFin = false
				break
			}
		}
		if (allFin) {
			for (let i = 0; i < todos.length; i++) {
				newTodos[i].done = false
			}
			todoNum = todos.length
			headerArrowIsSelected = false
		} else {
			for (let i = 0; i < todos.length; i++) {
				newTodos[i].done = true
			}
			todoNum = 0
			headerArrowIsSelected = true
		}
		let footerInfo = 'items'
		if (todoNum === 1) footerInfo = 'item'
		this.setState({
			todos: newTodos,
			todoNum,
			footerInfo,
			headerArrowIsSelected,
		})
	}
	changeMode(footerMode: FooterMode) {
		const todos = this.state.todos
		if (footerMode === FooterMode.all) {
			for (let i = 0; i < todos.length; i++) {
				todos[i].isShown = true
			}
		} else if (footerMode === FooterMode.active) {
			for (let i = 0; i < todos.length; i++) {
				if (!todos[i].done) todos[i].isShown = true
				else todos[i].isShown = false
			}
		} else {
			for (let i = 0; i < todos.length; i++) {
				if (todos[i].done) todos[i].isShown = true
				else todos[i].isShown = false
			}
		}
		this.setState({ footerMode })
	}
	clearCompleted() {
		const todos = this.state.todos
		const newTodos = todos.filter(todo => todo.done === false)
		this.setState({ todos: newTodos })
	}
	render() {
		return (
			<div id={styles.wrapper}>
				<h1 id={styles.title}>todos</h1>
				<div id={styles.todoapp}>
					<Header
						addTodo={this.addTodo}
						toggleAll={this.toggleAll}
						headerArrowIsSelected={this.state.headerArrowIsSelected}
					/>
					<List
						todos={this.state.todos}
						todoNum={this.state.todoNum}
						footerInfo={this.state.footerInfo}
						footerMode={this.state.footerMode}
						delTodo={this.delTodo}
						toggle={this.toggle}
						changeMode={this.changeMode}
            clearCompleted={this.clearCompleted}
					/>
				</div>
			</div>
		)
	}
}

export default App
