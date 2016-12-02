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
		margin: 0,
		padding: 0,
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
	}),

	media('(max-width:  240px)', $(' li', { flexBasis:  '100%'    })),
	media('(min-width:  580px)', $(' li', { flexBasis:  '33.3%'    })),
	media('(min-width:  720px)', $(' li', { flexBasis:  '25%'    })),
	media('(min-width:  960px)', $(' li', { flexBasis:  '20%'    })),
	media('(min-width: 1200px)', $(' li', { flexBasis:  '16.6%'    })),
	media('(min-width: 1440px)', $(' li', { flexBasis:  '14.2%'    })),
	media('(min-width: 1680px)', $(' li', { flexBasis:  '12.5%'    })),

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

);

