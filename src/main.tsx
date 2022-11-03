import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App menuItem={{
        title: '',
        price: 0,
        ingredients: '',
        allergies: '',
        imgUrl: '',
        quantity: 0,
        id: 0
      }} />
    </HashRouter>
  </React.StrictMode>
)
