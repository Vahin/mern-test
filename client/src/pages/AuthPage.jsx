import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";

export const AuthPage = () => {
  const message = useMessage();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (err) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      message(data.message);
      auth.login(data.token, data.userId);
    } catch (err) {}
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/links");
    }
  }, [auth, navigate]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Сократи ссылку</h1>
        <div className='card blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Авторизация</span>
            <div>
              <div className='input-field'>
                <input
                  placeholder='Введите email'
                  type='text'
                  id='email'
                  name='email'
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor='email'>Email</label>
              </div>

              <div className='input-field'>
                <input
                  placeholder='Введите пароль'
                  type='password'
                  id='password'
                  name='password'
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor='password'>Пароль</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn yellow darken-4'
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className='btn gray lighten-1 black-text'
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
