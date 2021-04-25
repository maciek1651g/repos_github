import { Fragment } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainPage from "./mainPage/MainPage";


const App = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
            <Route exact path="/repos_github/">
                <MainPage />
            </Route>
            <Route path="/repos_github/:id">
                <MainPage />
            </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
