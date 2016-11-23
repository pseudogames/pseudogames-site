import React from 'react'
import 'isomorphic-fetch'
import Layout from '../components/__layout'
import Gallery from '../components/gallery'

export default class extends React.Component {

	static async getInitialProps () {
		const res = await fetch('http://localhost:3001/api/project/');
		return { list: await res.json() };
	}

	render() {
		return (
			<Layout>
				<Gallery projects={this.props.list} />
			</Layout>
		);
	}
}

