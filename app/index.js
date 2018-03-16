import 'babel-polyfill'
import 'bootstrap'
import React from 'react'
import ReactDom from 'react-dom'
import Routes from './config/routes'

import './styles/main.scss'

ReactDom.render(<Routes />, document.getElementById('app'))
