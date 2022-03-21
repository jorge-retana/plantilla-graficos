import { Route, Routes } from 'react-router-dom'

import PrivateRoute from 'presentation/components/router/PrivateRoute'
import PublicRoute from 'presentation/components/router/PublicRoute'
import { HOME, LOGIN } from 'presentation/components/router/routes'
import MainPage from 'presentation/components/pages/MainPage'
import LoginPage from 'presentation/components/pages/LoginPage'

const routes = [
  { path: HOME, Component: MainPage, isPublic: false },
  { path: LOGIN, Component: LoginPage, isPublic: true },
]

const MainRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, Component, isPublic }) => (
        <Route
          key={path}
          path={path}
          element={
            isPublic ? (
              <PublicRoute>
                <Component />
              </PublicRoute>
            ) : (
              <PrivateRoute>
                <Component />
              </PrivateRoute>
            )
          }
        >
          <Route path="" element={<Component />} />
        </Route>
      ))}
    </Routes>
  )
}

export default MainRouter
