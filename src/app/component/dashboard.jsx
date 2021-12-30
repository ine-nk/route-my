import { Route, Link } from 'react-router-dom'
import Stats from './stats'
import Edit from './edit'


const Dashboard = () => {
  return (<div>
    <ul>
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <Link to='/dashboard/edit' >Edit</Link>
      </li>
    </ul>

    <Route exact path='/dashboard/' component={ Stats } />
    <Route path='/dashboard/edit' component={ Edit } />
  </div>)
}

export default Dashboard
