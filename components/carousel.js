import React from 'react'
import {merge, select as $, media} from 'next/css'
import Link from 'next/link'
import YouTube from 'react-youtube'

var id = 0;

export default (props) => {
	let index = [];
	var last = props.media.length-1;
	let list = props.media.map((item, i) => {
		let next = "#"+(id+(i == last ? -last : +1));
		if(last > 0)
			index.push(<a key={"i"+id} href={"#"+id}>&#x25cf;</a>);
		return <li key={"m"+id} id={id++}>{
			item.type == "youtube" ?
				<YouTube videoId={item.id} opts={{width: '100%'}}/>
			: item.type == "video" ?
				<video controls width="100%" height="100%">
					<source src={item.url} type="video/mp4"/>
				</video>
			: // item.type == "image" ?
				<a href={next}>
					<img src={item.url} />
				</a>
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

	$(' ul li img', {
		width: '100%',
		height: 'auto',
	}),

	$(' ul li video', {
		width: '100%',
		margin: '0 auto',
	}),

	$(' div', {
		textAlign: 'center'
	}),

	$(' div a', {
		color: 'black',
		textDecoration: 'none',
	}),

	$(' div a:active', {
		color: 'red',
	}),

);



