"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./CreateJob.css";
import { fetcher } from "../fetcher";

const CreateGovernmentJobs = ({ handleCloseForm, editData }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    department: "",
    location: "",
    posts: null,
    last_date: null
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const isEditMode = !!editData;

  // ✅ Prefill data when editing
  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        title: editData.title || "",
        url: editData.url || "",
        department: editData.department || "",
        location: editData.location || "",
        posts: editData.posts || null,
        last_date: editData.last_date.split("T")[0] || null
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
    if (!formData.title.trim())
      newErrors.title = "Title is required";
    if (!formData.url.trim()) newErrors.url = "URL is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";
    if (!formData.location.trim())
      newErrors.location = "Location is required";
    if (!formData.posts || formData.posts <= 0)
      newErrors.posts = "Posts must be a positive number";
    if (!formData.last_date)
      newErrors.last_date = "Last Date is required";
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
        ? `/government/jobs/${editData.government_links_id}`
        : "/government/jobs";

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
        <h2>{isEditMode ? "Edit Government Jobs" : "Create Government Jobs"}</h2>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Title..."
            />
            {errors.title && (
              <span className="error">{errors.title}</span>
            )}
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter Department..."
            />
            {errors.department && (
              <span className="error">{errors.department}</span>
            )}
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter Location..."
            />
            {errors.location && (
              <span className="error">{errors.location}</span>
            )}
          </div>
          
          <div className="form-group">
            <label>Posts</label>
            <input
              type="number"
              name="posts"
              value={formData.posts}
              onChange={handleChange}
            />
            {errors.posts && (
              <span className="error">{errors.posts}</span>
            )}
          </div>

          <div className="form-group">
            <label>Last Date</label>
            <input
              type="date"
              name="last_date"
              value={formData.last_date}
              onChange={handleChange}
              placeholder="Enter Last Date Name..."
            />
            {errors.last_date && (
              <span className="error">{errors.last_date}</span>
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

          <button type="submit" className="submit-btn">
            {isEditMode ? "Update Government Jobs" : "Create Government Jobs"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGovernmentJobs;


