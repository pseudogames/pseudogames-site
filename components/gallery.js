import React from 'react'
import Link from 'next/link'
import css from 'next/css'

export default (props) => (
  <div className={style}>
	<Link href="project">test</Link>
	[len={props.projects.length}]
  </div>
);

const style = css({
});


