import { createRoot } from 'react-dom/client'
import './assets/scss/index.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UIProvider } from './context/UIContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UIProvider>
      <App />
    </UIProvider>
  </BrowserRouter>
)
