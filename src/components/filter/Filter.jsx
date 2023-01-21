import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Filter extends Component {
	static propTypes = {
		filter: PropTypes.string.isRequired,
		onHandleCHange: PropTypes.func.isRequired,
	}

	render() {
		const { filter, onHandleCHange } = this.props
		return (<>
			<label>Find contacts by name or phone</label><br />
			<input type="text" value={filter} onChange={onHandleCHange} />
		</>
		)
	}
}
