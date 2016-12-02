import React from 'react'
import {merge, select as $, media} from 'next/css'
import Link from 'next/link'
import YouTube from 'react-youtube'

export default (props) => {
	let index = [];
	let len = props.media.length;
	let list = props.media.map((item, id) => {
		if(len > 1)
			index.push(<a key={id} href={"#"+id}>&#x25cf;</a>);
		return <li key={id} id={id}>{
			item.type == "youtube" ?
				<YouTube videoId={item.id} opts={{width: '100%', height: '400px'}}/>
			: item.type == "video" ?
				<video controls width="100%" height="100%">
					<source src={item.url} type="video/mp4"/>
				</video>
			: // item.type == "image" ?
				<a href={"#"+((id + 1) % len)} style={{backgroundImage: `url("${item.url}")`}} />
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
		maxWidth: '560px',
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
		backgroundPosition: 'center',
		width: '100%',
		height: '400px',
	}),

	$(' ul li video', {
		width: '100%',
		height: '400px',
	}),

	$(' div', {
		textAlign: 'center'
	}),

	$(' div > a', {
		color: 'black',
		textDecoration: 'none',
	}),

	$(' div > a:active', {
		color: 'darkred',
	}),

);



