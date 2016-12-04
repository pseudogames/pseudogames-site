import React from 'react'
import {merge, select as $, media} from 'next/css'
import Link from 'next/link'
import YouTube from 'react-youtube'

export default (props) => {
	let index = [];
	let len = props.media.length;
	if(len == 0) return <div />;
	let list = props.media.map((item, id) => {
		if(len > 1)
			index.push(<a key={id} href={"#"+id}>&#x25cf;</a>);
		return <li key={id} id={id}>{
			item.type == "youtube" ?
				<YouTube videoId={item.id} opts={{width: '100%', height: '360px'}}/>
			: item.type == "video" ?
				<video controls width="100%" height="100%">
					<source src={item.url} type="video/mp4"/>
				</video>
			: // item.type == "image" ?
				<a href={len == 1 ? null : "#"+((id + 1) % len)} style={{backgroundImage: `url("${item.url}")`}} />
		}</li>
	});
	return <div className={style}>
		<ul>{list}</ul>
		<div>{index}</div>
	</div>
};

const style = merge(
	{
		boxSizing: 'border-box',
		width: '100%',
		maxWidth: '500px',
		breakInside: 'avoid',
		margin: 'auto',
	},

	$(' *', {
		margin: 0,
		padding: 0,
		border: 0,
	}),

	$(' ul', {
		position: 'relative',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
	}),

	$(' ul li', {
		display: 'inline-block',
		width: '100%',
	}),

	$(' ul li a', {
		display: 'block',
		backgroundSize: 'cover',
		backgroundPosition: 'left top',
		transition: 'background-position 12s linear',
		width: '100%',
		height: '360px',
	}),

	$(' ul li:hover a', {
		backgroundPosition: 'right bottom',
	}),

	$(' ul li video', {
		width: '100%',
		height: '360px',
	}),

	$(' div', {
		textAlign: 'center',
		fontSize: '1.5em',
		letterSpacing: '0.25em',
		marginBottom: '0.3em',
	}),

	$(' div > a', {
		color: 'black',
		textDecoration: 'none',
	}),

	$(' div > a:active', {
		color: 'darkred',
	}),

);



