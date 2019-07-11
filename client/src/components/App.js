//Determinate for all React router stuff
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
//BrowserRouter brain for react-router-dom
//Route set of rules
import { connect } from 'react-redux';
//Compatibity between redux and react, we use connect to give the ability to some components to call actions creators
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import SurveyEditView from './surveys/SurveyEditView';
import '@tds/core-css-reset/dist/index.css';

class App extends Component {
    componentDidMount() {
        /* Call Actions Creator, those are imported by the export statement */
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container" >
                <BrowserRouter>
                    {/* Inside BrowserRouter we display probably routes or routes to visit, and expect one child */}
                    <div>
                        {/* Route has a component to display on the screen, landing component when he visit the first page */}
                        {/* React-router match every route with our current url */}
                        {/* exact={true} = exact */}
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/employees" component={Dashboard} />
                        <Route path="/employees/new" render={() => <SurveyNew />} />
                        <Route path="/employees/view" render={() => <SurveyEditView perPage={10} />} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);
//First argument is reserved for the map state props argument
