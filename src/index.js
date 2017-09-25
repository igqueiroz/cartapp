import React from 'react'
import { render } from 'react-dom'
import { DestaquePrimario } from './components/DestaquePrimario'
import { Router, Route, hashHistory } from 'react-router'
import { Top, Oooppsss404 } from './components/'

window.React = React

render(
	<Router history={hashHistory}>
		<Route component={Top}>
			<Route path="/" component={DestaquePrimario} />
		</Route>
		<Route path="*" component={Oooppsss404} />
	</Router>,
	document.querySelector('#react-container')
)