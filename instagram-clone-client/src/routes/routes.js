import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
    } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
    
import Home from './home';
import {Toolbar} from './../components/toolbar';
import Login from './../components/login';
// import Signin from './../components/login/signin';

// // const Home = () => [<Toolbar />,<h1>Home</h1>]
 const Register = () => [<Toolbar />,<h1>Register</h1>]

const routes = () => {
    return (
    <Router>
        <Switch>
           <Route path="/" exact component={Home}/>
           <Route path="/register" exact component={Register}/>
           <Route path="/login" exact component={Login}/>
        
        </Switch>
    </Router>
    )
}
export default routes;

