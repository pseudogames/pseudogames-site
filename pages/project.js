import React from 'react'
import Link from 'next/link'
import {merge, select as $, media} from 'next/css'
import 'isomorphic-fetch'
import ReactMarkdown from 'react-markdown';
import Layout from '../components/__layout'
import Carousel from '../components/carousel'

export default class extends React.Component {

	static async getInitialProps ({query}) {
		const res = await fetch(`http://pseudogames.com:3001/api/project/${query.id}`);
		return { project: await res.json() };
	}

	render() {
		let p = this.props.project;
		return (
		  <Layout>
			<div className={style}>
				<h1 className={back}><Link href="/">&laquo;</Link></h1>
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

const back = merge(
	{
		position: 'absolute',
		marginLeft: '-3%',
		zIndex: 9,
	},
	$(' a', {
		paddingRight: '0.25em',
		textDecoration: 'none',
		color: 'rgba(187, 68, 68, 0.33)',
		textShadow: '0 0 3px #fff',
		opacity: 0.66,
		transition: 'opacity 0.5s, color 0.5s',
		userSelect: 'none',
	}),
	$(':hover a', {
		opacity: 1,
		color: 'rgba(187, 68, 68, 1)',
	}),
);
