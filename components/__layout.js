import React from 'react'
import Head from 'next/head'
import Header from '../components/header'
export default ({ children }) => (
	<div>
		<Head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width" />
			<link href="https://fonts.googleapis.com/css?family=Exo:800" rel="stylesheet" />
			<style>{`

h1, h2, h3, h4, h5, h6, figure, figcaption,
html, body, div, form, fieldset, legend, label, 
section, header, nav, ul, li { margin: 0; padding: 0; }
table { border-collapse: collapse; border-spacing: 0; }
th, td { text-align: left; vertical-align: top; } 
h1, h2, h3, h4, h5, h6, th, td, caption { font-weight:normal; font-size: 1em; }
img { border: 0; }

section:not(:last-child) {
	margin-bottom: 0.5em;
}

section ul {
	margin-top: 0.4em;
	margin-left: 1.4em;
}

section ul ul {
	margin-top: 0.2em;
}

section li:not(:last-child) {
	margin-bottom: 0.2em;
}

section li li:not(:last-child) {
	margin-bottom: 0.1em;
}


h2 {
	font-size: 32px;
	margin-top: 0.5em;
	margin-bottom: 0.3em;
}

h3 {
	font-size: 24px;
	margin-top: 0.3em;
	margin-bottom: 0.2em;
}

a {
	text-decoration: none;
	color: inherit;
}

body {
	font-family: Arial, Helvetica, sans-serif;
}

.display {
	font-family: Exo, Arial, Helvetica, sans-serif;
}

			`}</style>
			<link rel="icon" href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAD///////////////////////////39/f/9/f3////////////9/f3//f39//////////////////////////////////////////////////39/f/+/v7//////+Hh4f/h4eH//v7+//7+/v/9/f3///////////////////////////////////////z8/P//////09PT/1tbW/9XV1f/WFhY/1tbW//T09P///////z8/P////////////////////////////z8/P//////vLy8/0NDQ/++vr7///////////++vr//QkJD/7y8vP///////Pz8//////////////////39/f//////z8/P/0JCQv/f3+D///////n4+f/5+fn//////9/f4P9CQkL/z8/P///////9/f3///////7+/v//////+fn5/0pKSv/Hx8b/+vr//9DQ6f/39/n//Pz6/9PT6//y8v3/yMjG/0lJSv/5+fn///////7+/v/7+/v//////4aGhv+AgH/////+/4+P2v/h4fP//f76//r6+f/w8Pb/jI3b//Pz+/+Dg4D/hoaH///////7+/v//////+zs7P9NTU//7e3g/5GR2f+dnuL////7//Ly9//z8/f////5/7q76P95edX/7Ozf/01NT//s7Oz///////////+hoaH/fn59/+zt7v89Pcb/v7/o//f39/////r////6//j39//U1Ov/OjvH/9jY6v+Cgn7/oKCh////////////cHBx/7q6s/+6u9v/KSrD/4SD2f9SUdX/pqbp/7u67f9SUtX/g4TY/zAxxP+entX/wMC0/29vcf//////+Pj4/2VlZv/Ozsr/x8fX/1FRxf/v7+3/5OTu/0FB1v8tLdT/0NDq//7+8P9bWsf/srLS/9LSy/9kZGb/+Pj4//Ly8v9sbGv/zc3O/97f2f/V1dz/3Nzn////+v9yc+D/UlLa////+v/i4un/0NDb/9/f2f/Nzc7/bGxr//Ly8v//////kJCQ/62trf/S0tP/3d3b/9jY4v+vruT/pKPn/6mp6P+mpuP/1NTh/9zc2//S0tP/ra2t/5CQkP////////////T09P/T09P/1tbW/9PT0//PztX/19fd//Dw5//y8uf/2tre/83N1f/S0tP/1tbW/9PT0//09PT////////////+/v7////////////7+/v/+Pj2//T08//u7vD/7u7w//T08//4+Pb/+/v7/////////////v7+/////////////v7+//39/f///////////////////////////////////////////////////////f39//7+/v//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==" />
		</Head>
		<Header />
		{ children }
	</div>
);
