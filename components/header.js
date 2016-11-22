import React from 'react'
import {merge} from 'next/css'

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
		paddingLeft: '9px',
		paddingRight: '9px',
		fontWeight: 'bold',
		minHeight: '40px',
	 
		animationDelay: '1s',
		animationDuration: '6s',
		animationName: 'glitch',
	},
	' a:hover': {
		color: "black !important";
	}
);

