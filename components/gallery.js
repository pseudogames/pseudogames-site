import React from 'react'
import Link from 'next/link'
import {merge, media, select as $} from 'next/css'

export default (props) => {
	var list = props.projects.map(p => {
		let url = `/project/${p.id}`;
		return <li key={p.id}>
			<Link href={url}><figure><figcaption>{p.label}</figcaption><img src={p.cover} /></figure></Link>
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


	...(
		[
			[ 600,  33   ],
			[ 400,  50   ],
			[ 200, 100   ],
			[1000,  20   ],
			[1200,  16.66],
			[1400,  14.28],
			[1600,  12.5 ],
		].map(m => 
			media(`(${m[0]<1000?'max':'min'}-width: ${m[0]}px)`, $(' li', { flexBasis: `${m[1]}%`} ))
		)
	)



	
);

