import React, { Component } from 'react'
import { Li } from './Contact.styled'
import PropTypes from 'prop-types'

export class Contact extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		number: PropTypes.string.isRequired,
		onDeleteContact: PropTypes.func.isRequired,
	}
	render() {
		const { name, number, onDeleteContact, id } = this.props
		return (
			<Li>
				{name}: {number} <button onClick={() => onDeleteContact(id)}>Delete</button>
			</Li>
		)
	}
}
