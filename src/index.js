import React from 'react';
import ReactDOM from 'react-dom';


import Layout from './pages/Layout';
import Archives from './pages/Archives';
import TodoCRUD from './pages/Todo/TodoCRUD';

import {Router, Route, IndexRoute, hashHistory} from 'react-router';



ReactDOM.render(
    <Router history={hashHistory}>
        
        <Route path="/" component={Layout}>
            <IndexRoute component={Archives}></IndexRoute>  
            <Route path="/archives(/:article)" component={Archives}></Route>
            <Route path="/todos(/:todoId)" component={TodoCRUD}></Route>
        </Route>
    </Router>
    , document.getElementById('root'));
