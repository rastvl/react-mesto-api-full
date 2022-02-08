import logo from "../images/logo.svg";
import { Route, Switch, Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header">
      <div className="header__logo" src={logo}></div>
      <Switch>
        <Route exact path="/">
          <div className="header__user-container">
            <p className="header__email">{props.userEmail}</p>
            <Link to="/sign-in" className="header__redirect" onClick={props.onSignOut}>
              Выйти
            </Link>
          </div>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__redirect">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__redirect">
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
};

export default Header;
