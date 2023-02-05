import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { AuthContext } from "../context/Auth.context";

export const Layout = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      {auth.isAuthenticated ? (
        <header>
          <Navbar />
        </header>
      ) : (
        <></>
      )}

      <Outlet />
    </div>
  );
};
