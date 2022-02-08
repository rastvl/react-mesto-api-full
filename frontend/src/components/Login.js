import { useState } from "react";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePassChange = (evt) => {
    setPass(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSignIn(email, pass);
  };

  return (
    <div className="auth">
      <h1 className="auth__header">Вход</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input className="auth-form__input" placeholder="E-mail" value={email} onChange={handleEmailChange} type="email" required />
        <input className="auth-form__input" placeholder="Пароль" value={pass} onChange={handlePassChange} type="password" required />
        <button className="auth-form__submit-btn">Войти</button>
      </form>
    </div>
  );
};

export default Login;
