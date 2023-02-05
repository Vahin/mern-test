import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";

export const DetailPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { token } = auth;
  const [link, setLink] = useState(null);
  const { request, loading } = useHttp();
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/links/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      console.log(fetched);
      setLink(fetched);
    } catch (error) {}
  }, [token, request, linkId]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/");
    }
  }, [navigate, auth]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <div>{!loading && link && <LinkCard link={link} />}</div>;
};
