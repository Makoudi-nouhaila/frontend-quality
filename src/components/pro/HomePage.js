import React, { useState, useEffect } from "react";
import { BiPencil } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layoutprop from "./Layoutprop";
import Footer from "../visiteur/Footer";

const HomePage = () => {
  const navigate = useNavigate();
  const [proprietaires, setProprietaires] = useState([]);
  const [userInfo, setUserInfo] = useState({
    username: "",
    photo: "",
    bio: "",
  });
  const [recherche, setRecherche] = useState({
    // Define your initial state for recherche here
  });

  const loadProprietaire = () => {
    fetch("http://localhost:8080/blog/proprietaires")
      .then((response) => response.json())
      .then((data) => setProprietaires(data));
  };

  const searchProprietaires = (nom) => {
    fetch(`http://localhost:8080/blog/proprietaires/nom/${nom}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProprietaires(data))
      .catch((error) => console.error("Error loading officiers:", error));
    console.log(proprietaires);
  };

  const handleInputChange = (e) => {
    setRecherche({ ...recherche, [e.target.name]: e.target.value });
    searchProprietaires(e.target.value);
  };

  const [editingField, setEditingField] = useState(null);

  const handleUpdate = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
    setEditingField(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Vérifiez si un fichier est sélectionné
    if (file) {
      // Utilisez FileReader pour convertir l'image sélectionnée en URL de données
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo({ ...userInfo, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    loadProprietaire();
  }, []);
  
  useEffect(() => {
    console.log(proprietaires);
  }, [proprietaires]);

  const renderField = (field, label) => {
    return (
      <div className="mb-3">
        <label htmlFor={field} className="form-label">
          {label}
        </label>
        <div className="d-flex">
          {field === "photo" ? (
            <img
              src={userInfo[field]}
              alt="Profile"
              className="img-thumbnail me-3"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          ) : (
            <div className="me-3">{userInfo[field]}</div>
          )}
          {editingField !== field && (
            <button
              className="btn btn-warning"
              onClick={() => setEditingField(field)}
            >
              <BiPencil /> Edit
            </button>
          )}
        </div>
        {editingField === field && (
          <div className="mt-2">
            {field === "photo" ? (
              <input
                type="file"
                id={field}
                className="form-control"
                accept="image/*"
                onChange={handleInputChange}
              />
            ) : (
              <input
                type="text"
                id={field}
                className="form-control"
                value={userInfo[field]}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, [field]: e.target.value })
                }
              />
            )}
            <div className="mt-2">
              <button
                className="btn btn-primary"
                onClick={() => handleUpdate(field, userInfo[field])}
              >
                Update
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => setEditingField(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Layoutprop />
      <div className="container mt-5">
        <h2>Hello To your blog </h2>
        <p>here you can share your ideas</p>
        <div className="card">
          <div className="card-body">
            {renderField("username", "Username")}
            {renderField("photo", "Photo")}
            {renderField("bio", "Biography")}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
