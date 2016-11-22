import React from 'react'
import Head from 'next/head'
export default () => (
	<Head>
		<style>{`

/*
fluorescent bulb flickering
https://youtu.be/7lfci-WaXu8
http://webdocs.cs.ualberta.ca/~graphics/books/GraphicsGems/gems/FitCurves.c
*/
@keyframes glitch {
	 0.00% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	 1.05% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	 1.58% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	 6.32% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	 6.84% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	 8.95% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	16.05% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	16.32% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	21.05% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	21.58% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	22.89% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	23.42% { text-shadow: 0 0 30px rgba(255,251,235, 1.0000) }
	28.42% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	29.21% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	29.74% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	30.26% { text-shadow: 0 0 28px rgba(240,244,248, 0.9412) }
	32.63% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	33.16% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	36.05% { text-shadow: 0 0 27px rgba(227,204,134, 0.8902) }
	36.32% { text-shadow: 0 0  5px rgba(  1,  0,  0, 0.0039) }
	37.89% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	39.47% { text-shadow: 0 0 14px rgba( 98,133,155, 0.3843) }
	41.05% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	42.11% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	42.89% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	49.74% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	52.63% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	52.89% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	54.21% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	55.79% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	56.32% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	58.95% { text-shadow: 0 0  5px rgba(255,255,255, 0.0000) }
	59.21% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	60.00% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	60.53% { text-shadow: 0 0 28px rgba(241,240,242, 0.9451) }
	62.89% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	63.16% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	67.37% { text-shadow: 0 0 30px rgba(224,205,158, 1.0000) }
	68.16% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	72.11% { text-shadow: 0 0 26px rgba(255,255,255, 0.8784) }
	73.42% { text-shadow: 0 0  5px rgba(  1,  0,  0, 0.0000) }
	73.68% { text-shadow: 0 0 30px rgba(255,255,249, 1.0000) }
	73.95% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0039) }
	79.74% { text-shadow: 0 0 30px rgba(255,244,164, 1.0000) }
	80.26% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	80.53% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	88.16% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
	88.42% { text-shadow: 0 0 30px rgba(255,255,255, 1.0000) }
	88.68% { text-shadow: 0 0  5px rgba(  0,  0,  0, 0.0000) }
}

		`}</style>
	</Head>
);

