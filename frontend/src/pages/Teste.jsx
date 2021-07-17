import React, { Fragment } from 'react'
import { connect } from 'react-redux'

function exemplo(props) {
		return ( 
			<Fragment>
				<div>{props.prop1.exemplo}</div>
				<div>{props.prop2.exemplo}</div>
			</Fragment>
		)
}

function mapStateToProps(state) {
	return {
		prop1: state.prop1,
		prop2: state.prop2
	}
}

export default connect(mapStateToProps)(exemplo)