import React, { Fragment } from "react";
import { Header } from "./components/layouts";
import EnterpriseList from "./components/Enterprises/EnterpriseList";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateEnterprise from "./components/Enterprises/CreateEnterprise";
import ContactList from "./components/Contacts/ContactList"

import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateContact from "./components/Contacts/CreateContact";
import Login from "./components/Login/Login";

export default class extends React.Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/companies" component={EnterpriseList} />
            <Route exact path="/new-company" component={CreateEnterprise} />
            <Route exact path="/new-contact" component={CreateContact} />
            <Route
              exact
              path="/companies/:id/edit"
              component={CreateEnterprise}
            />
            <Route
              exact
              path="/companies/:id/contacts"
              component={ContactList}
            />
            <Route
              exact
              path="/contacts/:id/edit"
              component={CreateContact}
            />
            <Route
              exact
              path="/"
              component={Login}
            />
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}
