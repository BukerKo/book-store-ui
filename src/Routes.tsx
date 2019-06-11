import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import User from "./components/User";
import App from "./App";

export default () =>
    <Switch>
        <Route path="/register" component={Register} />
        <Route path="/user" component={User} />
        <Route path="/" component={App} />
    </Switch>;
