import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/visiteur/Layout";
import Articles from "./components/visiteur/Articles";
import ArticleDetail from "./components/visiteur/ArticleDetail";
import Articleprop from "./components/pro/Articleprop";
import EditArticle from "./components/pro/EditArticle";
import CategoryPage from "./components/pro/Categoriepage";
import HomePage from "./components/pro/HomePage";
import SignIn from "./components/pro/signin";
import SignUp from "./components/pro/signup";

const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

const PrivateRoute = ({ element, ...props }) => {
  if (isAuthenticated()) {
    return React.cloneElement(element, props);
  } else {
    return <Navigate to="/signin" />;
  }
};

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route
          path="/home/:id"
          element={<PrivateRoute element={<HomePage />} />}
        />
        <Route
          path="/articleadmin"
          element={<PrivateRoute element={<Articleprop />} />}
        />
        <Route
          path="/categorie"
          element={<PrivateRoute element={<CategoryPage />} />}
        />
        <Route
          path="/articledit"
          element={<PrivateRoute element={<EditArticle />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
