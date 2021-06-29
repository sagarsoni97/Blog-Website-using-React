import { Route, Switch } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import Home from './Home';
import CreateBlog from './CreateBlog';
import BlogDetails from './BlogDetails';
import Profile from './Profile';
import MyEditor from './MyEditor';
import Protected from '../Protected-Routes/Protected'

const Navbar = (props) => {
    return (
       <>
        <Switch>
      <Route path="/" component={Signup} exact />
      <Route path="/Signin" component={Signin} exact /> 
      <Route path="/Home">
        <Protected Cmp={Home} />
      </Route>

      <Route path="/CreateBlog"> 
      <Protected Cmp={CreateBlog} />
      </Route>

      <Route path="/Profile"> 
      <Protected  Cmp={Profile}/>
      </Route>
      <Route path="/:BlogDetails" component={BlogDetails} exact /> 
      </Switch>
       </>
    )
}

export default Navbar;
