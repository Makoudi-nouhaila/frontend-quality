import React, { useEffect, useState } from "react";
import Layoutprop from "./Layoutprop";
import Footer from "../visiteur/Footer";
import { useNavigate } from "react-router-dom/dist";

const AddArticle = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const currentDate = new Date();
  const [formData, setFormData] = useState({
    id: "",
    titre: "",
    photo: "",
    texte: "",
    date: currentDate.toISOString(),
    lien: "",
    categorie: {
      id: "",
    },
    user: {
      id: "",
    },
  });

  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "categorie") {
      setFormData({
        ...formData,
        categorie: { ...formData.categorie, id: e.target.value },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked!");

    try {
      const head = { "Content-Type": "application/json" };
      const body = JSON.stringify(formData);
      console.log(body);
      const response = await fetch("http://localhost:8080/blog/article", {
        method: "POST",
        headers: head,
        body: body,
      });

      if (response.ok) {
        navigate("/articleadmin");
      } else {
        console.error("Failed to create article");
      }
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  const loadCategories = () => {
    fetch("http://localhost:8080/blog/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    setFormData({
      ...formData,
      categorie: {
        id: category,
      },
    });
  };

  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      if (userFromLocalStorage) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          user: {
            id: userFromLocalStorage.id,
          },
        }));
      }
    };

    loadCategories();
    loadUserFromLocalStorage();
  }, []);
  return (
    <>
      <Layoutprop></Layoutprop>
      <div className="container mt-5">
        <h2>Create a New Article</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className={`form-control ${errors.titre ? "is-invalid" : ""}`}
              id="titre"
              name="titre"
              value={formData.titre}
              onChange={(e) => handleChange(e)}
            />
            {errors.titre && (
              <div className="invalid-feedback">{errors.titre}</div>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image Upload
            </label>
            <input
              type="file"
              className="form-control"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Selected"
                className="img-thumbnail mt-2"
                style={{ maxWidth: "200px" }}
              />
            )}
            {errors.photo && (
              <div className="invalid-feedback">{errors.photo}</div>
            )}
          </div>

          {/* Text */}
          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Text
            </label>
            <textarea
              className={`form-control ${errors.texte ? "is-invalid" : ""}`}
              id="texte"
              name="texte"
              value={formData.texte}
              onChange={(e) => handleChange(e)}
            ></textarea>
            {errors.texte && (
              <div className="invalid-feedback">{errors.texte}</div>
            )}
          </div>

          {/* Link (optional) */}
          <div className="mb-3">
            <label htmlFor="link" className="form-label">
              Link (optional)
            </label>
            <input
              type="text"
              className="form-control"
              id="lien"
              name="lien"
              value={formData.lien}
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {/* Map over the categories to create options */}
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nom}
                </option>
              ))}
            </select>
            {errors.category && (
              <div className="invalid-feedback">{errors.category}</div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AddArticle;
