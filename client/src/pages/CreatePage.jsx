import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { useHttp } from "../hooks/http.hook";

export const CreatePage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [link, setLink] = useState("");
  const { request } = useHttp();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/");
    }
  }, [navigate, auth]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setLink(event.target.value);
  };

  const keyPressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/links/generate",
          "POST",
          {
            from: link,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        console.log(data);
        navigate(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };

  return (
    <div className='row'>
      <div className='col s8 offset-s2'>
        <div className='input-field'>
          <input
            placeholder='Вставьте ссылку'
            type='text'
            id='link'
            name='email'
            value={link}
            onChange={changeHandler}
            onKeyPress={keyPressHandler}
          />
          <label htmlFor='link'>Email</label>
        </div>
      </div>
    </div>
  );
};
