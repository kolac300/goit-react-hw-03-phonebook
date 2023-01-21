import React, { Component } from 'react'
import { Label, StyledForm, InvalidValue } from './PhoneBook.styled'
import { Formik, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import PropTypes from 'prop-types'

const phoneRegexp = /^\+380\d{3}\d{2}\d{2}\d{2}$/
const scheme = yup.object().shape({
	number: yup
		.string()
		.trim()
		.matches(phoneRegexp, "add correct format phone +380ххххххххх")
		.required(),
	name: yup
		.string()
		.min(3)
		.max(40)
		.required()
})
const initialValues = {
	number: '',
	name: ''
}
export class ContactForm extends Component {
	static propTypes = {
		onAddContact: PropTypes.func.isRequired,
	}
	onSubmit = (value, { resetForm }) => {
		const { name, number } = value
		this.props.onAddContact(name, number)
		resetForm()
	}
	render() {
		return (<>
			<h1>Phone Book</h1>
			<Formik initialValues={initialValues} validationSchema={scheme} onSubmit={this.onSubmit}>
				<StyledForm>
					<Label>Name</Label>
					<Field
						type="text"
						name="name"
					/>
					<ErrorMessage component={InvalidValue} name='name' />
					<Label>Number</Label>
					<Field
						type="tel"
						name="number"
					/>
					<ErrorMessage component={InvalidValue} name='number' />
					<Label htmlFor=""><button type='submit'>Add contact</button></Label>
				</StyledForm>
			</Formik>
		</>
		)
	}
}
