
import React, { Component } from 'react'
import { Contact } from './contact/Contact'
import { SearchWrapper } from './Contacts.styled'
import PropTypes from 'prop-types'

export class ContactList extends Component {
	static propTypes = {
		filtredContacts: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			number: PropTypes.string.isRequired,
		})).isRequired,
		onDeleteContact: PropTypes.func.isRequired,
	}
	render() {
		const { onDeleteContact, filtredContacts } = this.props

		return (
			<>
				<SearchWrapper>
					<ul>
						{filtredContacts.map(contact =>
							<Contact onDeleteContact={onDeleteContact}
								key={contact.id}
								id={contact.id}
								name={contact.name}
								number={contact.number} />)}
					</ul>
				</SearchWrapper>
			</>

		)
	}
}
