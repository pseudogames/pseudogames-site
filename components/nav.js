import React from 'react'
import {merge, select as $} from 'next/css'
import Head from 'next/head'
import Icons from '../components/_icons'
export default () => (
  <nav className={style}>
	<Icons />
	<a className="icon-youtube-square"  style={dd(0.25, 11)} title="youtube" href="http://youtube.com/user/zed9h"></a>
	<a className="icon-github-square"   style={dd(0.75,  9)} title="github" href="http://github.com/pseudogames/"></a>
	<a className="icon-facebook-square" style={dd(0.5 , 10)} title="facebook" href="http://www.facebook.com/zed9h"></a>
	<a className="icon-linkedin-square" style={dd(1.5 ,  8)} title="linkedin" href="http://br.linkedin.com/in/zed9h/"></a>
	<a className="icon-steam-square"    style={dd(1.0 , 12)} title="steam" href="http://steamcommunity.com/id/zed9h"></a>
  </nav>
);

var dd = (delay, duration) => ({animationDelay: delay+"s", animationDuration: duration+"s"});

const style = merge(
	{
		paddingTop: '6px',
		marginBottom: '-6px'
	},
	$(' a', {
		fontSize: '32px',
		verticalAlign: 'text-bottom',

		animationName: 'glitch'
	})
);
