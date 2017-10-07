import React, { Component } from 'react'
import { fullBlack } from 'material-ui/styles/colors'

const IntroHeader = (props) => {
	return (
		<h1>
			<span>{props.introText}</span>
			{props.mainText}
		</h1>
	)
}

class Intro extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section style={{ height: '1300px', backgroundColor: fullBlack }}>
				<div className="banner-vcenter">
					<div className="container">
						<div className="banner-content">
								<IntroHeader introText="Hi, I am" mainText="Rob Clucas"/>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default Intro;