import { Fragment } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainPage from "./MainPage";


const App = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
            <Route path="*">
                <MainPage />
            </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
