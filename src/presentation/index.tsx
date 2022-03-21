import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import AuthProvider from './contexts/AuthContext'
import MainLayout from './components/containers/MainLayout'
import MainRouter from './components/router/MainRouter'

import './assets/styles/main.css'

const render = () => {
  const container = document.getElementById('root')

  const content = (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <MainRouter />
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  )

  ReactDom.render(content, container)
}

export default render
