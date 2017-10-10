import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
		var backgroundImage = 'url(' + this.props.backgroundImg + ')';
		return (
			<section style={{ backgroundColor    : this.props.backgroundColor,
												backgroundImage    : backgroundImage,
												backgroundPosition : 'center center',
												backgroundRepeat   : 'no-repeat'    ,
												backgroundSize 		 : 'cover'       	}}>
				<div className="banner-vcenter">
					<div className="container">
						<div className="banner-content">
								<IntroHeader introText = {this.props.introText}
														 mainText  = {this.props.mainText} />
								<IntroList list={this.props.titles} />
						</div>
					</div>
				</div>
			</section>
		)
	}
}

Intro.defaultProps = {
  introText 		  : "Hello and",
  mainText        : "Welcome"  ,
  titles     		  : ["Java Developer", "Distributed Systems Expert"],
  backgroundImg   : "",
  backgroundColor : fullBlack
};

Intro.propTypes = {
  introText  		  : PropTypes.string,
  mainText    	  : PropTypes.string,
  titles    		  : PropTypes.arrayOf(PropTypes.string),
  backgroundImg   : PropTypes.string,
  backgroundColor : PropTypes.string
};

export default Intro;