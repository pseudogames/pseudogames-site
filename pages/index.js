import React from 'react'
import 'isomorphic-fetch'
import Layout from '../components/__layout'
import Gallery from '../components/gallery'

export default class extends React.Component {

	static async getInitialProps () {
		//const res = await fetch('http://pseudogames.com/api/project/');
		//const data = await res.json();
		//return { username: data.profile.username };
		return { list: [1,2] };
	}

	render() {
		return (
			<Layout>
				<Gallery projects={this.props.list} />
			</Layout>
		);
	}
}

