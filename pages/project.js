import React from 'react'
import 'isomorphic-fetch'
import {merge, select as $, media} from 'next/css'
import Layout from '../components/__layout'
import Carousel from '../components/carousel'

export default class extends React.Component {

	static async getInitialProps ({query}) {
		const res = await fetch(`http://localhost:3001/api/project/${query.id}`);
		return { project: await res.json() };
	}

	render() {
		var safe = _ => _;

		let p = this.props.project;
		let media = (p.video || []).concat(p.image || []);
		let desc = <section>{p.description.map(row =>
			!Array.isArray(row) ?
			<p>{safe(row)}</p> : 
			<div><p>{safe(row[0])}</p><ul>{row.slice(1).map(it => <li>{safe(it)}</li>)}</ul></div>
		)}</section>;
		let topics = ['control','credit'].filter(t => !!p[t]).map(t =>
			<section>
				<h3>{t.charAt(0).toUpperCase() + t.slice(1)}</h3>
				<ul>{ 
					p[t].map(item => 
						!Array.isArray(item) ? 
						<li>{safe(item)}</li> :
						<li>{safe(item[0])}<ul>{item.slice(1).map(it => <li>{safe(it)}</li>)}</ul></li>
					)
				}</ul>
			</section>
		);
		return (
		  <Layout>
			<div className={style}>
				<Carousel media={media} />
				<h2>{p.title}</h2>
				{desc}
				{topics}
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
