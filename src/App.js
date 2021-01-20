import React from "react";
import "./App.css";
import "./index.css";

import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { TodoListProvider } from "./context";

import HomeComponent from "./pages/home";
import HistoryComponent from "./pages/history";

import Layout from "./layout";

import "sweetalert2/src/sweetalert2.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const history = createBrowserHistory();

function App(props) {
  return (
    <div className="App">
      <Router history={history}>
        <TodoListProvider>
          <Layout>
            <Switch>
              <Route path="/history">
                <HistoryComponent />
              </Route>
              <Route exact path="/">
                <HomeComponent />
              </Route>
              <Redirect path="*" to="/" />
            </Switch>
          </Layout>
        </TodoListProvider>
      </Router>
    </div>
  );
}

export default App;
