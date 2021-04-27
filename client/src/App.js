import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bulma";
import "./App.css"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faGlobe, faSort } from "@fortawesome/free-solid-svg-icons";
import Search from "./views/Search";
import Saved from "./views/Saved";

library.add(faSearch, faGlobe, faSort);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/saved">
          <Saved />
        </Route>
        <Route exact path="/">
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
