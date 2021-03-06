import 'babel-polyfill'
import 'bootstrap'
import React from 'react'
import ReactDom from 'react-dom'

import './firebase-app'
import './styles/main.scss'
import Routes from './config/routes'
import './location-listener'

ReactDom.render(<Routes />, document.getElementById('app'))
