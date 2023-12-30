import React, { useState } from "react";
import Layoutprop from "./Layoutprop";
import Footer from "../visiteur/Footer";

const EditArticle = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    text: "",
    link: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (file) {
      // Use FileReader to convert the selected image to a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.image) newErrors.image = "Image URL is required";
    if (!formData.text) newErrors.text = "Text is required";
    if (!formData.category) newErrors.category = "Category is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // TODO: Handle form submission (e.g., send data to the server)

    // Reset form after successful submission
    setFormData({
      title: "",
      image: "",
      text: "",
      link: "",
      category: "",
    });
    setErrors({});
  };

  // Dropdown options for category
  const categoryData = ["Technology", "Science", "Health", "Art", "Sports"];

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
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
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
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Selected"
              className="img-thumbnail mt-2"
              style={{ maxWidth: "200px" }}
            />
          )}
          {errors.image && (
            <div className="invalid-feedback">{errors.image}</div>
          )}
        </div>

        {/* Text */}
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Text
          </label>
          <textarea
            className={`form-control ${errors.text ? "is-invalid" : ""}`}
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
          ></textarea>
          {errors.text && (
            <div className="invalid-feedback">{errors.text}</div>
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
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className={`form-select ${errors.category ? "is-invalid" : ""}`}
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="" disabled>Select a category</option>
            {categoryData.map((category) => (
              <option key={category} value={category}>
                {category}
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

export default EditArticle;
