import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { Link, Route, Switch} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react"; // HOOKS

const Header = () => {
  const history = useHistory();
  const [favExists, setfavExists] = useState(false);

  useEffect(() => {
    if (Cookies.get("favsChar")) {
      setfavExists(true);
    }

  }, [favExists]);

  return (
    <header>
      <div className="container flex flex-center flex-space-between ">
        <div className="logo ml-3" onClick={() => history.push("/")}></div>

        <div className="main-menu flex gap20 flex-end mr-3">
          <Link to="/">
            {" "}
            <div> Personnages</div>
          </Link>

          <div>Comics</div>

          <div>Favoris {favExists === true && "+"}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
