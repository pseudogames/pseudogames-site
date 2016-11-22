import React from 'react'
import Head from 'next/head'
export default () => (
	<Head>
		<style>{`

@font-face {
  font-family: "fontastic";
  src:url("/static/fonts/fontastic.eot");
  src:url("/static/fonts/fontastic.eot?#iefix") format("embedded-opentype"),
    url("/static/fonts/fontastic.woff") format("woff"),
    url("/static/fonts/fontastic.ttf") format("truetype"),
    url("/static/fonts/fontastic.svg#fontastic") format("svg");
  font-weight: normal;
  font-style: normal;

}

[class^="icon-"]:before,
[class*=" icon-"]:before {
  font-family: "fontastic" !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-variant: normal !important;
  text-transform: none !important;
  speak: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-steam-square:before {
  content: "S";
}
.icon-github-square:before {
  content: "G";
}
.icon-facebook-square:before {
  content: "F";
}
.icon-linkedin-square:before {
  content: "L";
}
.icon-youtube-square:before {
  content: "Y";
}

		`}</style>
	</Head>
);

