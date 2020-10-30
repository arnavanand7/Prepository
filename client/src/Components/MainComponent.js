import React, { Component } from 'react';
import Menu from './MenuComponent'
import Home from './HomeComponent'
import { Switch, Route, BrowserRouter as Router, Redirect, withRouter } from "react-router-dom";

class Main extends Component {
    render() {
        return (
            <>
                <Menu />
                <Switch>
                    <Route exact path='/' >
                        <Home />
                    </Route>
                </Switch>
            </>
        )
    }
}

export default withRouter(Main);