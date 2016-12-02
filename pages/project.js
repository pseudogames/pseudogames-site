import React from 'react'
import {merge, select as $, media} from 'next/css'
import 'isomorphic-fetch'
import ReactMarkdown from 'react-markdown';
import Layout from '../components/__layout'
import Carousel from '../components/carousel'

export default class extends React.Component {

	static async getInitialProps ({query}) {
		const res = await fetch(`http://localhost:3001/api/project/${query.id}`);
		return { project: await res.json() };
	}

	render() {
		let p = this.props.project;
		return (
		  <Layout>
			<div className={style}>
				<Carousel media={p.media} />
				<ReactMarkdown source={p.content} />
			</div>
		  </Layout>
		);
	}
}

const style = merge(
	{
		padding: '3%',
		maxWidth: '800px',
	},

);
