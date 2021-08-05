// MARVEL TECHNICAL TEST
import "./css/reset.scss";
import "./css/common.scss";
import "./css/app.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Character from "./pages/Character";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" >
          <Home />
          </Route>
          <Route path="/character/:id" >
          <Character  />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
