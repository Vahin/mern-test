import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useCallback } from "react";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";

export const LinksPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { token } = auth;
  const { loading, request } = useHttp();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/");
    }
  }, [navigate, auth]);

  const fetchLinks = useCallback(async () => {
    const fetched = await request("/api/links/", "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    setLinks(fetched);
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) return <Loader />;

  return <>{!loading && <LinksList links={links} />}</>;
};
