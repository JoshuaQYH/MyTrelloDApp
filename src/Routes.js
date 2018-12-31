import React, { Component } from 'react';
import {Router, Route, browserHistory} from 'react-router';

import taskInfo from './pages/taskInfo';
import addTask from './pages/addTask';
import memberInfo from './pages/memberInfo';
import addMember from './pages/addMember';
import fireMember from './pages/fireMember';
import voteTo from './pages/voteTo';
import NotFound from './pages/NotFound';
import setVote from './pages/setVote';
import App from './pages/App';
const history = browserHistory;

class mainRouter extends Component{
    render(){
        return(
            <Router history={history}>
                <Route path='/' component={taskInfo}/>
                <Route path='/taskinfo' component={taskInfo}/>
                <Route path='/addtask' component={addTask}/>
                <Route path='/memberinfo' component={memberInfo}/>
                <Route path ='/addmember' component={addMember}/>
                <Route path='/firemember' component = {fireMember}/>
                <Route path='/voteto' component = {voteTo}/>
                <Route path='/setvote' component = {setVote}/>
                <Route path='/register' component = {App}/>
                <Route path="*" component={NotFound}/>
            </Router>
        )
       
    }
}

export default mainRouter;
