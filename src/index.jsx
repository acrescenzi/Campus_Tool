// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'

import store from './store';

import Root from './components/Root';
import Home from './components/Home';

import Students from './components/Students';
import Student from './components/Student';
import NewStudent from './components/NewStudent';

import Campus from './components/CampusGrid';
import SingleCampus from './components/SingleCampus';
import NewCampus from './components/NewCampus';

const marginStyle = {
  margin: '10px',
};

render(
  <Provider store={store}>
    <BrowserRouter >
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
              <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>

              <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossOrigin="anonymous"></script>

              <div className="container">

              <Link to="/"><button type="button" className="btn btn-primary" style={marginStyle}>Home</button></Link>
              <Link to="/students"><button type="button" className="btn btn-primary" style={marginStyle}>Students</button></Link>
              <Link to="/campuses"><button type="button" className="btn btn-primary" style={marginStyle}>Campuses</button></Link>
              <Link to="/campuses/new"><button type="button" className="btn btn-primary" style={marginStyle}>New Campus</button></Link>
              <Link to="/students/new"><button type="button" className="btn btn-primary" style={marginStyle}>New Student</button></Link>
              <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/students" component={Students} />
                    <Route exact path="/students/view/:studentId" component={Student} />
                    // TODO Test
                    <Route exact path="/students/new" component={NewStudent} />
                    // TODO Test
                    <Route exact path="/students/edit/:studentId" component={NewStudent} />

                    <Route exact path="/campuses" component={Campus} />
                    <Route exact path="/campuses/view/:campusId" component={SingleCampus} />
                    <Route exact path="/campuses/new" component={NewCampus} />
                    <Route exact path="/campuses/edit/:campusId" component={NewCampus} />
                    <Route component={Root} />
              </Switch>
              </div>
    </BrowserRouter>
  </Provider>,
document.getElementById('root')
);
// render(<Hello />, document.getElementById('root'));
