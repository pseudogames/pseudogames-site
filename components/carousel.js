import React from 'react'
import {merge, select as $, media} from 'next/css'
import Link from 'next/link'

var id = 0;

export default (props) => {
	let index = [];
	var last = props.media.length-1;
	let list = props.media.map((url, i) => {
		let next = "#"+(id+(i == last ? -last : +1));
		index.push(<a key={"i"+id} href={"#"+id}>&#x25cf;</a>);
		return <li key={"m"+id} id={id++}>
			<a href={next}>
			<img src={url} />
			</a>
		</li>
	});
	return <div className={style}>
		<ul>{list}</ul>
		<div>{index}</div>
	</div>
};

const style = merge(
	{
		boxSizing: 'border-box',
		width: '400px'
	},
	media('(max-width:  400px)', { width: '100%' }),
	//media('(min-width:  800px)', { width: '600px' }),

	$(' ul', {
		position: 'relative',
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	}),

	$(' ul li', {
		display: 'inline-block',
		width: '100%',
	}),

	$(' ul li img', {
		width: '100%',
		height: 'auto'
	}),

	$(' div', {
		textAlign: 'center'
	}),

	$(' div a', {
		color: 'black',
		textDecoration: 'none'
	}),

	$(' div a:active', {
		color: 'red'
	}),

);



