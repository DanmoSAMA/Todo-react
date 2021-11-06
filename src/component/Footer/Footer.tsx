import React from 'react'
import styles from './Footer.module.scss'

enum FooterMode {
	all,
	active,
	completed,
}

interface Props {
  todoTotalNum: number
	todoNum: number
	footerInfo: string
	footerMode: FooterMode
  changeMode: (footerMode: FooterMode) => void
  clearCompleted: () => void
}

class Footer extends React.Component<Props> {
	render() {
		return (
			<li 
        id={styles.footer}
        className={this.props.todoTotalNum === 0 ? styles.hidden : ''}
        >
				<ul>
					<a href="/#" id={styles.stati}>
						{this.props.todoNum} {this.props.footerInfo} left
					</a>
					<a
						href="/#"
						className={
							this.props.footerMode === FooterMode.all
								? `${styles.btn} ${styles.selected}`
								: styles.btn
						}
						id={styles['show-all-btn']}
            onClick={() => {
              this.props.changeMode(FooterMode.all)
            }}
					>
						All
					</a>
					<a
						href="/#"
						className={
							this.props.footerMode === FooterMode.active
								? `${styles.btn} ${styles.selected}`
								: styles.btn
						}
						id={styles['show-active-btn']}
            onClick={() => {
              this.props.changeMode(FooterMode.active)
            }}
					>
						Active
					</a>
          <a
						href="/#"
						className={
							this.props.footerMode === FooterMode.completed
								? `${styles.btn} ${styles.selected}`
								: styles.btn
						}
						id={styles['show-completed-btn']}
            onClick={() => {
              this.props.changeMode(FooterMode.completed)
            }}
					>
						Completed
					</a>
					<a 
            href="/#" 
            className={
							this.props.todoTotalNum !== this.props.todoNum
								? `${styles.btn} ${styles.appear}`
								: styles.btn
						}
            id={styles.clear}
            onClick={() => {
              this.props.clearCompleted()
            }}
            >
						Clear completed
					</a>
				</ul>
			</li>
		)
	}
}

export default Footer
