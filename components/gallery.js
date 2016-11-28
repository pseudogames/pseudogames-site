import React from 'react'
import Link from 'next/link'
import {merge, media, select as $} from 'next/css'

export default (props) => {
	var list = props.projects.map(p => {
		return <li key={p.id}>
			<Link href={`/project?id=${p.id}`}><figure><figcaption>{p.label}</figcaption><img src={p.cover} /></figure></Link>
		</li>
	});

	return <ul className={style}>
		{list}
		<li />
		<li />
		<li />
	</ul>
};

var style = merge(
	{
		display: 'flex',
		flexFlow: 'row wrap',
		width: '100%',
	},

	$(' li', {
		display: 'inline-block',
		position: 'relative',
		transition: '0.25s all',
		flex: '0 1',
		flexBasis: '25%',
	}),

	$(' li:empty', {
		height: 0,
	}),

	$(' li figure', {
		display: 'block',
		width: '100%',
		height: 'auto',
	}),

	$(' li img', {
		display: 'block',
		width: '100%',
		height: 'auto',
	}),

	$(' li figcaption', {
		display: 'none',
		position: 'absolute',
		bottom: '0',
		left: '0',
		right: '0',
		background: 'rgba(0,0,0,0.6)',
		color: 'white',
		padding: '2px',
	}),

	$(' li:hover figcaption', {
		display: 'block',
	}),

	media('(max-width:  600px)', $(' li', { flexBasis:  '33%'    })),
	media('(max-width:  400px)', $(' li', { flexBasis:  '50%'    })),
	media('(max-width:  200px)', $(' li', { flexBasis: '100%'    })),
	media('(min-width: 1000px)', $(' li', { flexBasis:  '20%'    })),
	media('(min-width: 1200px)', $(' li', { flexBasis:  '16.66%' })),
	media('(min-width: 1400px)', $(' li', { flexBasis:  '14.28%' })),
	media('(min-width: 1600px)', $(' li', { flexBasis:  '12.5%'  })),

);

