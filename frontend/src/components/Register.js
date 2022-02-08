import { Link } from "react-router-dom";
import { useState } from "react";

const Register = props => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }

  const handlePassChange = (evt) => {
    setPass(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSignUp({email, pass})
  }


  return (
    <div className="auth">
      <h1 className="auth__header">Регистрация</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input className="auth-form__input" placeholder="email@mail.com" type="email" value={email} onChange={handleEmailChange} required />
        <input className="auth-form__input" placeholder="Пароль" type="password" value={pass} onChange={handlePassChange} required />
        <button className="auth-form__submit-btn" type="submit">Зарегистрироваться</button>
      </form>
      <p className="registration-auth-link">
        Уже зарегистрированы?
        <Link className="registration-auth-link__link" to="/sign-in"> Войти</Link>
      </p>
    </div>
  );
}

export default Register;