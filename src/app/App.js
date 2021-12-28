// import { Router } from 'react-router'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom/cjs/react-router-dom.min'
import Dashboard from './component/dashboard'
import Home from './component/home'
import Login from './component/login'
import NavBar from './component/navBar'
import NotFound from './component/not-found'
import Posts from './component/posts'
import Stats from './component/stats'
import TestRender from './component/test-render'

function App() {
  return (
    <div>
      <NavBar />
      <h1>App</h1>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard/stats" component={Stats} />
        <Route path="/dashboard" component={Dashboard} />
        <Route
          path="/test-render"
          render={(props) => {
            return true && <TestRender isAdmin={false} {...props} />
          }}
        />
        <Route path="/login" component={Login} />
        <Route path="/posts/:postId?" component={Posts} />
        <Route path="/404" component={NotFound} />
        <Redirect from="/admin" to="dashboard" />
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default App
