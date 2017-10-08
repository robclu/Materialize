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

const IntroList = (props) => {
	return (
		<div>
		<ul>
			{
				props.list.map((name, i, listObj) => {
					if (i === listObj.length - 1) {
						return <li className="intro-element">{name}</li>
					} else {
						return <li className="intro-element">{name}<span>-</span></li>
					}
				})
			}
		</ul>
		</div>
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
								<IntroHeader introText="Hello and" mainText="Welcome"/>
								<IntroList list={["Software Developer", "Student"]} />
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default Intro;