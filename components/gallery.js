import React from 'react'
import Link from 'next/link'
import {merge, media, select as $} from 'next/css'

export default (props) => {
	var list = props.projects.map(p => {
		return <li key={p.id}>
			<Link href={`/project?id=${p.id}`}>
				<figure style={{backgroundImage: `url("${p.cover}")`}}><figcaption>{p.label}</figcaption></figure>
			</Link>
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
		margin: 0,
		padding: 0,
		backgroundColor: '#181010',
	},

	$(' *', {
		margin: 0,
		padding: 0,
	}),

	$(' li', {
		display: 'inline-block',
		position: 'relative',
		flex: '0 1',
		flexBasis: '50%',
		height: 'calc(50vw * 0.9)',
	}),

	media('(max-width:  380px)', $(' li', { flexBasis: '100%'  , height: 'calc(100vw   * 0.9)' })),
	media('(min-width:  640px)', $(' li', { flexBasis:  '33.3%', height: 'calc( 33.3vw * 0.9)' })),
	media('(min-width:  800px)', $(' li', { flexBasis:  '25%'  , height: 'calc( 25vw   * 0.9)' })),
	media('(min-width: 1000px)', $(' li', { flexBasis:  '20%'  , height: 'calc( 20vw   * 0.9)' })),
	media('(min-width: 1300px)', $(' li', { flexBasis:  '16.6%', height: 'calc( 16.6vw * 0.9)' })),
	media('(min-width: 1500px)', $(' li', { flexBasis:  '14.2%', height: 'calc( 14.2vw * 0.9)' })),
	media('(min-width: 1800px)', $(' li', { flexBasis:  '12.5%', height: 'calc( 12.5vw * 0.9)' })),

	$(' li figure', {
		width: '100%',
		height: '100%',
		backgroundSize: 'cover',
		backgroundPosition: 'right top',
		transition: 'background-position 1s ease',
	}),

	$(' li:hover figure', {
		backgroundPosition: 'left bottom',
	}),

	$(' li:empty', {
		height: 0,
	}),

	$(' li figcaption', {
		position: 'absolute',
		bottom: '0',
		left: '0',
		right: '0',
		//background: 'rgba(206,127,109,0.7)',
		background: 'rgba(255,255,255,0.85)',
		color: '#200',
		padding: '4px',

		fontFamily: 'Exo,sans-serif',
		fontSize: '16px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',

		borderLeft: '4px solid #911',
		transition: 'border-left-width 0.25s ease',
	}),

	$(' li:hover figcaption', {
		borderLeftWidth: '9px',
	}),

);

