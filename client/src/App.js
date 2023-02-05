import "materialize-css";
import { Layout } from "./components/Layout";
import { CreatePage } from "./pages/CreatePage";
import { AuthPage } from "./pages/AuthPage";
import { LinksPage } from "./pages/LinksPage";
import { DetailPage } from "./pages/DetailPage";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/Auth.context";
import { Loader } from "./components/Loader";

function App() {
  const { token, userId, login, logout, ready } = useAuth();
  let isAuthenticated = !!token;

  if (!ready) {
    console.log("show loader");
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<AuthPage />} />
          <Route path='links' element={<LinksPage />} />
          <Route path='create' element={<CreatePage />} />
          <Route path='detail' element={<DetailPage />} />
          <Route path='detail/:id' element={<DetailPage />} />
          <Route path='*' element={<LinksPage />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
