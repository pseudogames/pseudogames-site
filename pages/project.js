import React from 'react'
import 'isomorphic-fetch'
import Layout from '../components/__layout'
import Carousel from '../components/carousel'

export default class extends React.Component {

	static async getInitialProps () {
		//const res = await fetch('http://pseudogames.com/api/project/');
		//const data = await res.json();
		//return { username: data.profile.username };
		return { media: [1,2,2] };
	}

	render() {
		return (
		  <Layout>
			<Carousel content={this.props.media} />
		  </Layout>
		);
	}
}

