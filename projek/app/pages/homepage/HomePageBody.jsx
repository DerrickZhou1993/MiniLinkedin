import React, { Component } from 'react'

//1 todo
//todo1: freely explore the styles here. Change and/or remove some className or styling to see the effect

export default class HomePageBody extends Component {

	render() {
		return (<div className="container">
			<div className="row">
				<div className="col-lg-6" style={{border: "1px solid black"}}>
				[1,1]
				</div>
				<div className="col-lg-6" style={{border: "1px solid black"}}>
				[1,2]
				</div>
			</div>
			<div className="row">
				<div className="col-lg-4" style={{border: "1px solid black"}}>
				[2,1]
				</div>
				<div className="col-lg-6" style={{border: "1px solid black"}}>
				[2,2]
				</div>
				<div className="col-lg-2" style={{border: "1px solid black"}}>
				[2,3]
				</div>
			</div>
		</div>)
	}
}