import React from 'react'
import {merge, select as $} from 'next/css'

import Flicker from '../components/_flicker'
import Title from '../components/title'
import Nav from '../components/nav'
export default () => (
  <header className={style}>
    <Flicker />
	<Title />
	<Nav />
  </header>
);

const style = merge(
	{
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: 'rgba(255,255,248,1)',
		background: '#b44',
		borderBottom: '2px solid #611',
		fontSize: '24px',
		padding: '0 9px',
	 
		animationDelay: '1s',
		animationDuration: '6s',
		animationName: 'glitch',
	},

	$(' a', {
		textDecoration: 'none',
		color: 'inherit',
	}),

	$(' a:hover', {
		color: "#411",
	})
);

