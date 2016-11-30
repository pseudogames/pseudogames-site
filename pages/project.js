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
			<section>{safe(row)}</section> : 
			<section>{safe(row[0])}<ul>{row.slice(1).map(it => <li>{safe(it)}</li>)}</ul></section>
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
		columnCount: '1',
		columnGap: '1em',
		columnRule: '1px solid black',
		padding: '1em'
	},
	media('(max-width:  400px)', { padding: '0.2em' }),
	media('(min-width:  900px)', { columnCount: '2' }),
	media('(min-width:  1300px)', { columnCount: '3' }),
	media('(min-width:  1800px)', { columnCount: '4' }),

	$(' section', {
		flex: '0 0 400px',
	})

);
