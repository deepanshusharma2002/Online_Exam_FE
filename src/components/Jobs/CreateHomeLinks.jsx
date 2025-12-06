"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./CreateJob.css";
import { fetcher } from "../fetcher";

const CreateHomeLinks = ({ handleCloseForm, editData }) => {
  const [formData, setFormData] = useState({
    display_name: "",
    url: "",
    type: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const isEditMode = !!editData;

  // ✅ Prefill data when editing
  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        display_name: editData.display_name || "",
        url: editData.url || "",
        type: editData.type || "",
      });
    }
  }, [editData]);

  // ✅ Handle input & compress image if large
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.display_name.trim())
      newErrors.display_name = "Display Name is required";
    if (!formData.url.trim()) newErrors.url = "URL is required";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    try {

      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode
        ? `/home/links/${editData.home_links_id}`
        : "/home/links";

      const result = await fetcher(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: `Home Links ${isEditMode ? "updated" : "created"} successfully!`,
        });

        setErrors({});
        setTimeout(() => handleCloseForm(), 800);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Operation failed",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="create-job-container">
      <div className="header-links">
        <a className="back-link" onClick={handleCloseForm}>
          <FaArrowLeft /> Back
        </a>
      </div>

      <div className="form-card">
        <h2>{isEditMode ? "Edit Home Links" : "Create Home Links"}</h2>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Display Name</label>
            <input
              type="text"
              name="display_name"
              value={formData.display_name}
              onChange={handleChange}
              placeholder="Enter Display Name..."
            />
            {errors.display_name && (
              <span className="error">{errors.display_name}</span>
            )}
          </div>

          <div className="form-group">
            <label>URL</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Enter URL..."
            />
            {errors.url && <span className="error">{errors.url}</span>}
          </div>

          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="home">Home</option>
              <option value="footer">Footer</option>
            </select>
            {errors.type && <span className="error">{errors.type}</span>}
          </div>


          <button type="submit" className="submit-btn">
            {isEditMode ? "Update Home Links" : "Create Home Links"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHomeLinks;


