// MARVEL TECHNICAL TEST
import "./css/reset.css";
import "./css/common.css";
import "./css/app.css";
import Loader from "./components/Loader";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Character from "./pages/Comics";

function App() {
  return (
    <div>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/characters/:id">
            <Character />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
